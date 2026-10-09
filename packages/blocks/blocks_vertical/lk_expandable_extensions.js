// lk: Extensions for vertical expandable blocks in LibreKitten's fork of scratch-blocks.
'use strict';

goog.provide('Blockly.ScratchBlocks.ExpandableExtensions');

goog.require('Blockly.Colours');
goog.require('Blockly.constants');

// CONSTANTS //

Blockly.ScratchBlocks.ExpandableExtensions.TEXT_INPUT_PREFILL_LIST = [
  'apple', 'banana', 'pear', 'kiwi', 'orange', 'avocado', 'tomato', 'grape', 'strawberry', 'blueberry',
  'dragonfruit', 'monkfruit'
];

// INTERNAL METHODS //

/**
 * Internal helper to update labels and create/remove inputs. Adapted from:
 * https://codeberg.org/ampmod/ampmod/src/commit/ffe0bba130/packages/blocks/blocks_vertical/operators.js#L610-632
 * @param {Number} index The index of the field to add.
 * @param {Boolean} isLoading Whether the block is initialising.
 * @param {String} blockType The type of the shadow block to create in the input.
 * @param {!String} value Optional. The string to fill the input with. ONLY use with an editable input shadow.
 * @returns {Blockly.Input} The created input.
 */
Blockly.ScratchBlocks.ExpandableExtensions.addExpandedInput_ = function(index, isLoading, blockType, value) {
  var inputName = 'ADD' + index;
  var input = this.appendValueInput(inputName);
  
  if (!isLoading && input.connection) {
    var inputShadow = this.fillExpandedInputBlock_(input.connection, blockType, this);
    if (typeof value === 'string') {
      switch (blockType) {
        case 'text':
          inputShadow.setFieldValue(value, 'TEXT');
          break;
        case 'math_number':
        case 'math_integer':
        case 'math_whole_number':
        case 'math_positive_number':
        case 'math_angle':
          inputShadow.setFieldValue(value, 'NUM');
          break;
      }
    }
  }

  return input;
};

/**
 * Fills an input with a new shadow block of a specified type. This does not handle filling in the shadow.
 * @param {Blockly.Connection} connection The input's internal connection.
 * @param {String} blockType The type of the shadow to generate.
 * @param {Blockly.Block} parentBlock The parent block of the input.
 * @returns {Blockly.Block} The generated shadow block.
 */
Blockly.ScratchBlocks.ExpandableExtensions.fillExpandedInputBlock_ = function(connection, blockType, parentBlock) {
  var eventsEnabled = Blockly.Events.isEnabled();
  // Temporaraily disable block events to prevent the real block creation event from propagating.
  if (eventsEnabled) Blockly.Events.disable();

  var newBlock = this.workspace.newBlock(blockType);
  newBlock.setShadow(true);

  // Spoof a create event. We spoof it because the real event does not say the block is a
  // shadow (because it wasn't at the time of creation), and because of that the VM will neve
  // realise it is a shadow block.
  if (eventsEnabled) {
    Blockly.Events.enable();
    var existingGroup = Blockly.Events.getGroup();
    if (!existingGroup) {
      Blockly.Events.setGroup(true);
    }
    try {
      Blockly.Events.fire(new Blockly.Events.BlockCreate(newBlock));
    } finally {
      if (!existingGroup) {
        Blockly.Events.setGroup(false);
      }
    }
  }

  connection.connect(newBlock.outputConnection);

  // As we tread into Renderland, we must be careful to not awake the sleeping horror that is the insertion marker,
  // which for reasons only known to the Flying Spaghetti Monster, does the maleficent act of hiding a block via CSS.
  // Unfortunately, this tranquilising spell only lasts a single render, which afterwards dooms any mortal lifeform
  // to forever seeing an unsightly insertion marker whenever they dare to drag a block with their meaty hands.
  // Thus, we must not awaken this block-based entity at all costs...
  if (parentBlock.rendered && parentBlock.getSvgRoot().getAttribute('visibility') !== 'hidden') {
    newBlock.initSvg();
    newBlock.render();
    parentBlock.render();
  }

  return newBlock;
};

/**
 * Spoofs a mutation event. This is so the VM actually knows the mutation changed.
 */
Blockly.ScratchBlocks.ExpandableExtensions.spoofMutationEvent_ = function() {
  var mutationDom = this.mutationToDom();
  var xml = Blockly.Xml.domToText(mutationDom);

  // We don't need to provide a previous mutation, as the VM doesn't care about that.
  Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, null, xml));
};

// EXTENSIONS //

/**
 * lk: Extension to make represent an expandable block.
 * @this {Blockly.Block}
 * @readonly
 */
Blockly.ScratchBlocks.ExpandableExtensions.EXPANDABLE_INPUTS = {
  textList: Blockly.ScratchBlocks.ExpandableExtensions.TEXT_INPUT_PREFILL_LIST,
  updateShape_: function(inputLength, isLoading) {
    // Destroy any inputs added to this block.
    for (var i = this.inputs_; i > 0; i--) {
      this.removeInput("ADD" + i);
    }
    this.inputs_ = 0;

    var addedInputs = [];
    // (Re)generate inputs.
    for (var i = 1; i <= inputLength; i++) {
      var input = this.addExpandedInput_(i, isLoading, 'text', this.textList[i - 1] || 'item');
      addedInputs.push(input);
      this.inputs_ = i;
    }
    return addedInputs;
  },
  expandBlockByInput: function() {
    this.inputs_++;
    this.addExpandedInput_(this.inputs_, false, 'text', this.textList[this.inputs_ - 1] || 'item');
    this.spoofMutationEvent_();
    this.render();
  },
  contractBlockByInput: function() {
    if (this.inputs_ === Math.max(this.minExpandedInputs, 0)) return;
    this.removeInput("ADD" + this.inputs_--); // We don't need to run the full updateShape_ here.
    this.spoofMutationEvent_();
    this.render();
  },
  /**
   * Create XML to represent the name and arguments of a procedure
   * definition block.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('inputs', String(this.inputs_));
    return container;
  },
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('inputs'));
    if (Number.isNaN(this.itemCount_)) return;
    this.itemCount_ = Math.max(this.itemCount_, this.minExpandedInputs);

    // Find connections.
    var connections = [];
    for (var i = 1; i <= this.itemCount_; i++) {
      var input = this.getInput('ADD' + i);
      if (!input || !input.connection) continue;
      var itemBlock = input.connection.targetBlock();
      if (itemBlock && !itemBlock.isInsertionMarker()) { // Make sure the block isn't an insertion marker!
        if (itemBlock.isShadow()) {
          itemBlock.dispose();
          continue;
        } else {
          itemBlock.outputConnection.disconnect();
        }
        connections.push({
          block: itemBlock.outputConnection,
          realBlock: itemBlock,
        });
      }
    }

    // :sparkle: Magic input rebuilding! :sparkle:
    this.updateShape_(this.itemCount_, true);

    // Peform a reconnection.
    for (var i = 1; i <= this.itemCount_; i++) {
      if (connections.block) {
        var input = this.getInput('ADD' + i);
        if (!input || !input.connection) continue;
        input.connection.connect(connections.block);
      }
    }
  }
};

Blockly.ScratchBlocks.ExpandableExtensions.EXPANDABLE_INPUTS_FUNC = function() {
  if (typeof this.minExpandedInputs === 'number' && !Number.isNaN(this.minExpandedInputs)) {
    this.inputs_ = this.minExpandedInputs;
  } else {
    this.inputs_ = 0;
    this.minExpandedInputs = 0;
  }
  this.expandableAdd_ = this.getField('ADD');
  this.expandableSubtract_ = this.getField('SUBTRACT');

  if (!this.expandableAdd_ || !this.expandableSubtract_) {
    throw 'One or two expandable buttons are missing.';
  }

  this.addExpandedInput_ = Blockly.ScratchBlocks.ExpandableExtensions.addExpandedInput_.bind(this);
  this.fillExpandedInputBlock_ = Blockly.ScratchBlocks.ExpandableExtensions.fillExpandedInputBlock_.bind(this);
  this.spoofMutationEvent_ = Blockly.ScratchBlocks.ExpandableExtensions.spoofMutationEvent_.bind(this);

  if (!this.initialInputsAdded_) {
    this.updateShape_(this.inputs_, false);
  }

  this.initialInputsAdded_ = true;
};

/**
 * Register all expandable extensions for scratch-blocks.
 * @package
 */
Blockly.ScratchBlocks.ExpandableExtensions.registerAll = function() {
  Blockly.Extensions.registerMutator('expandable_inputs',
      Blockly.ScratchBlocks.ExpandableExtensions.EXPANDABLE_INPUTS,
      Blockly.ScratchBlocks.ExpandableExtensions.EXPANDABLE_INPUTS_FUNC);
};

Blockly.ScratchBlocks.ExpandableExtensions.registerAll();

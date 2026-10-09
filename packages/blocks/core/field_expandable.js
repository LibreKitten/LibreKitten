/**
 * @fileoverview Expandable field.  Used for expandable blocks.
 * @author ACat
 */
'use strict';

goog.provide('Blockly.FieldExpandable');

goog.require('Blockly.Field');
goog.require('goog.dom');
goog.require('goog.math.Size');
goog.require('goog.userAgent');


/**
 * Class for an expand or contract button on an expandable block.
 * @param {string} type Whether this field adds or subtracts.
 * @param {Function=} opt_validator A function that is executed when a new
 *     option is selected, with the newly selected value as its sole argument.
 *     If it returns a value, that value (which must be one of the options) will
 *     become selected in place of the newly selected option, unless the return
 *     value is null, in which case the change is aborted.
 * @extends {Blockly.Field}
 * @constructor
 */
Blockly.FieldExpandable = function(type, opt_validator) {
  if (type !== 'add' && type !== 'subtract') throw type + 'is not a valid expandable field type!';
  this.buttonType_ = type;

  // Call parent's constructor.
  Blockly.FieldExpandable.superClass_.constructor.call(this, null, opt_validator);

  this.size_.width = this.size_.height;
};
goog.inherits(Blockly.FieldExpandable, Blockly.Field);

/**
 * Construct a FieldExpandable from a JSON arg object,
 * dereferencing any string table references.
 * @param {!Object} options A JSON object with options (src, width, height, alt,
 *     and flipRtl/flip_rtl).
 * @returns {!Blockly.FieldExpandable} The new field instance.
 * @package
 * @nocollapse
 */
Blockly.FieldExpandable.fromJson = function(options) {
  var type = Blockly.utils.replaceMessageReferences(options['buttonType']);
  return new Blockly.FieldExpandable(type);
};

/**
 * Editable fields are saved by the XML renderer, non-editable fields are not.
 */
Blockly.FieldExpandable.prototype.EDITABLE = true;

/**
 * Mouse cursor style when over the hotspot that initiates the editor.
 */
Blockly.FieldExpandable.prototype.CURSOR = 'pointer';

/**
 * Install this image on a block.
 */
Blockly.FieldExpandable.prototype.init = function() {
  if (this.fieldGroup_) {
    // Field has already been initialized once.
    return;
  }

  Blockly.FieldExpandable.superClass_.init.call(this);
  this.render_();

  // Build the DOM.
  /** @type {SVGElement} */
  this.box_ = Blockly.utils.createSvgElement('rect', {
    'rx': Blockly.BlockSvg.CORNER_RADIUS,
    'ry': Blockly.BlockSvg.CORNER_RADIUS,
    'x': 0,
    'y': 0,
    'width': this.size_.width,
    'height': this.size_.height,
    'stroke': this.sourceBlock_.getColourTertiary(),
    'fill': this.sourceBlock_.getColour(),
    'class': 'blocklyBlockBackground',
    'fill-opacity': 1
  }, null);
  this.className_ = 'blocklyText';

  this.fieldGroup_.appendChild(this.textElement_);
  this.fieldGroup_.insertBefore(this.box_, this.textElement_);
  
  if (!this.visible_) {
    this.fieldGroup_.style.display = 'none';
  }
  this.sourceBlock_.getSvgRoot().appendChild(this.fieldGroup_);

  this.setText(this.buttonType_ === 'add' ? '+' : '-');

  // Force a re-render.
  this.render_();
};

/**
 * Run the function to expand or contract the block.
 * @private
 */
Blockly.FieldExpandable.prototype.showEditor_ = function() {
  // This partly was inspired by:
  // https://codeberg.org/ampmod/ampmod/src/branch/develop/packages/blocks/core/field_expandable_add.js

  var type = this.buttonType_;
  if (type === 'add' && typeof this.sourceBlock_.expandBlockByInput === 'function') {
    this.sourceBlock_.expandBlockByInput();
  } else if (type === 'subtract' && typeof this.sourceBlock_.contractBlockByInput === 'function') {
    this.sourceBlock_.contractBlockByInput();
  }
};

/**
 * Dispose of all DOM objects belonging to this field.
 */
Blockly.FieldExpandable.prototype.dispose = function() {
  goog.dom.removeNode(this.fieldGroup_);
  this.fieldGroup_ = null;
  this.box_ = null;
  this.textElement_ = null;
};

/**
 * Returns null. This is not a value.
 * @returns {null} Returns nothing.
 */
Blockly.FieldExpandable.prototype.getValue = function() {
  return null;
};

/**
 * No-op. This is not a value.
 */
Blockly.FieldExpandable.prototype.setValue = function() {
  // nop
};

Blockly.Field.register('field_expandable', Blockly.FieldExpandable);

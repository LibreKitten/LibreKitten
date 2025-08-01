'use strict';

goog.provide('Blockly.Blocks.resources');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['resources_get'] = {
  /**
   * Block to get a resource.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.RESOURCES_GET,
      "tooltip": Blockly.Msg.RESOURCES_GET_TOOLTIP,
      "args0": [
        {
          "type": "input_value",
          "name": "RESOURCE_INPUT"
        }
      ],
      "extensions": ["colours_resources", "output_string"]
    });
  }
};

Blockly.Blocks['resources_resources_menu'] = {
  /**
   * "Resource [Resource]" Block Menu.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "RESOURCES_MENU",
          "options": [["", ""]]
        }
      ],
      "extensions": ["colours_resources", "output_string"]
    });
  }
};

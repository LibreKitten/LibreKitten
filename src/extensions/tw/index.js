const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

/**
 * Class for TurboWarp blocks
 * @constructor
 */
class TurboWarpBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'tw',
            name: 'Misc',
            color1: '#454545',
            color2: '#303030',
            color3: '#1f1f1f',
            blocks: [
                {
                    opcode: 'getLastKeyPressed',
                    text: formatMessage({
                        id: 'tw.blocks.lastKeyPressed',
                        default: 'last key pressed',
                        description: 'Block that returns the last key that was pressed'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'checkDarkMode',
                    text: formatMessage({
                        id: 'tw.blocks.checkDarkMode',
                        default: 'is system dark mode on?',
                        description: 'Block that returns if the system dark mode is on'
                    }),
                    blockType: BlockType.BOOLEAN
                },
                {
                    opcode: 'getButtonIsDown',
                    text: formatMessage({
                        id: 'tw.blocks.buttonIsDown',
                        default: '[MOUSE_BUTTON] mouse button down?',
                        description: 'Block that returns whether a specific mouse button is down'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        MOUSE_BUTTON: {
                            type: ArgumentType.NUMBER,
                            menu: 'mouseButton',
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'startHats',
                    text: formatMessage({
                        id: 'tw.blocks.startHats',
                        default: 'execute all scripts with the hat type [HAT_TYPE]',
                        description: 'Block that executes all scripts with a certain hat type'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        HAT_TYPE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'greenFlag',
                    text: formatMessage({
                        id: 'tw.blocks.greenFlag',
                        default: 'restart',
                        description: 'Block that restarts the project.'
                    }),
                    blockType: BlockType.COMMAND,
                    hideFromPalette: true,
                },
                {
                    opcode: 'exponentiation',
                    text: formatMessage({
                        id: 'tw.blocks.exponentiation',
                        default: '[ONE] ** [TWO]',
                        description: 'Block that performs exponentiation'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        ONE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        TWO: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: true,
                },
                {
                    opcode: 'regex',
                    text: formatMessage({
                        id: 'tw.block.regex',
                        default: 'execute regex [REGEX] on [STRING]',
                        description: 'Block that executes regex on a string.'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        REGEX: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: true,
                },
                {
                    opcode: 'replaceOperation',
                    text: formatMessage({
                        id: 'tw.block.replace',
                        default: 'in [STRING] replace [ONE] with [TWO]',
                        description: 'Block that does a replace operation on a string.'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        ONE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        TWO: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: true,
                },
                {
                    opcode: 'substring',
                    text: formatMessage({
                        id: 'tw.block.substring',
                        default: 'from [STRING] get letters [BEGINNING] to [END]',
                        description: 'Block that does a replace operation on a string.'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'LibreKitten'
                        },
                        BEGINNING: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        END: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '6'
                        }
                    },
                    hideFromPalette: true,
                },
                {
                    opcode: 'true',
                    text: formatMessage({
                        id: 'tw.block.true',
                        default: 'true',
                        description: 'Block that returns true.'
                    }),
                    blockType: BlockType.BOOLEAN,
                    hideFromPalette: true,
                },
                {
                    opcode: 'false',
                    text: formatMessage({
                        id: 'tw.block.false',
                        default: 'false',
                        description: 'Block that returns false.'
                    }),
                    blockType: BlockType.BOOLEAN,
                    hideFromPalette: true,
                },
                {
                    opcode: 'pi',
                    text: formatMessage({
                        id: 'tw.block.pi',
                        default: 'π',
                        description: 'Block that returns pi'
                    }),
                    blockType: BlockType.REPORTER,
                },
                {
                    opcode: 'e',
                    text: formatMessage({
                        id: 'tw.block.e',
                        default: 'e',
                        description: 'Block that returns eulers number'
                    }),
                    blockType: BlockType.REPORTER,
                },
                {
                    opcode: 'booleanify',
                    text: formatMessage({
                        id: 'tw.block.booleanify',
                        default: '[REPORTER]',
                        description: 'Boolean that returns its input.'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        REPORTER: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: true,
                },
                {
                    opcode: 'strictlyEquals',
                    text: formatMessage({
                        id: 'tw.block.strictlyEquals',
                        default: '[ONE] strictly equals [TWO]',
                        description: 'Block that returns true only if it strictly equals it.'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        ONE: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        TWO: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: true,
                },
                {
                    opcode: 'comment',
                    text: formatMessage({
                        id: 'tw.block.comment',
                        default: 'explain code [COMMENT]',
                        description: 'Block that is a comment.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COMMENT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'This program says "Hello world!"'
                        }
                    },
                },
                {
                    opcode: 'commentCBlock',
                    text: formatMessage({
                        id: 'tw.block.commentCBlock',
                        default: 'explain code [COMMENT]',
                        description: 'Block that is a comment.'
                    }),
                    blockType: BlockType.CONDITIONAL,
                    arguments: {
                        COMMENT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'This program says "Hello world!"'
                        }
                    },
                },
                {
                    opcode: 'noOpCBlock',
                    text: formatMessage({
                        id: 'tw.block.noOpCBlock',
                        default: 'comment out',
                        description: 'Block that is no-op.'
                    }),
                    blockType: BlockType.CONDITIONAL,
                }
            ],
            menus: {
                mouseButton: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.primary',
                                default: '(0) primary',
                                description: 'Dropdown item to select primary (usually left) mouse button'
                            }),
                            value: '0'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.middle',
                                default: '(1) middle',
                                description: 'Dropdown item to select middle mouse button'
                            }),
                            value: '1'
                        },
                        {
                            text: formatMessage({
                                id: 'tw.blocks.mouseButton.secondary',
                                default: '(2) secondary',
                                description: 'Dropdown item to select secondary (usually right) mouse button'
                            }),
                            value: '2'
                        }
                    ],
                    acceptReporters: true
                }
            }
        };
    }

    getLastKeyPressed (args, util) {
        return util.ioQuery('keyboard', 'getLastKeyPressed');
    }

    getButtonIsDown (args, util) {
        const button = Cast.toNumber(args.MOUSE_BUTTON);
        return util.ioQuery('mouse', 'getButtonIsDown', [button]);
    }

    checkDarkMode (args, util) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    startHats (args, util) {
        util.startHats(args.HAT_TYPE);
    }

    exponentiation (args, util) {
        return args.ONE ** args.TWO;
    } 

    regex (args, util) {
        return args.STRING.match(new RegExp(args.REGEX));
    }

    replaceOperation (args, util) {
        return args.STRING.replace(args.ONE, args.TWO);
    }

    true (args, util) {
        return true;
    }
    pi (args, util) {
        return '3.141592653589793238462643383279502884197';
    }
    e (args, util) {
        return '2.7182818284590452353602874713527';
    }
 
    false (args, util) {
        return false;
    }

    strictlyEquals (args, util) {
        return args.ONE === args.TWO;
    }

    booleanify (args, util) {
        return args.REPORTER;
    }

    substring (args, util) {
        return args.STRING.substring(args.BEGINNING - 1, args.END - 1);
    }

    greenFlag (args, util) {
        vm.greenFlag();
    }

    comment () {
        // no-op
    }

    commentCBlock () {
        return true;
    }


    noOpCBlock () {
        // no-op
    }

}

module.exports = TurboWarpBlocks;

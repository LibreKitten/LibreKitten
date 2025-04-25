const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

const xmlEscape = require('../../util/xml-escape');

const markdown = require('markdown-it/dist/markdown-it.min.js');
const DOMPurify = require('dompurify');

/**
 * Class for LibreKitten blocks
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
                    tooltip: formatMessage({
                        id: 'tw.blockTooltip.checkDarkMode',
                        default: 'I check if the system-wide dark mode is on.',
                        description: 'Tooltip for a block that returns if the system dark mode is on.'
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
                    hideFromPalette: true
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
                    hideFromPalette: true
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
                    hideFromPalette: true
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
                    hideFromPalette: true
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
                    hideFromPalette: true
                },
                {
                    opcode: 'true',
                    text: formatMessage({
                        id: 'tw.block.true',
                        default: 'true',
                        description: 'Block that returns true.'
                    }),
                    blockType: BlockType.BOOLEAN,
                    hideFromPalette: true
                },
                {
                    opcode: 'false',
                    text: formatMessage({
                        id: 'tw.block.false',
                        default: 'false',
                        description: 'Block that returns false.'
                    }),
                    blockType: BlockType.BOOLEAN,
                    hideFromPalette: true
                },
                {
                    opcode: 'pi',
                    text: formatMessage({
                        id: 'tw.block.pi',
                        default: 'π',
                        description: 'Block that returns pi'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'e',
                    text: formatMessage({
                        id: 'tw.block.e',
                        default: 'e',
                        description: 'Block that returns eulers number'
                    }),
                    blockType: BlockType.REPORTER
                },
                {
                    opcode: 'infinity',
                    text: formatMessage({
                        id: 'tw.block.infinity',
                        default: '∞',
                        description: 'Block that returns Infinity'
                    }),
                    blockType: BlockType.REPORTER
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
                    hideFromPalette: true
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
                    hideFromPalette: true
                },
                {
                    opcode: 'comment',
                    text: formatMessage({
                        id: 'tw.block.comment',
                        default: 'explain code [COMMENT]',
                        description: 'Block that is a comment.'
                    }),
                    tooltip: formatMessage({
                        id: 'tw.blockTooltip.comment',
                        // eslint-disable-next-line max-len
                        default: 'I am a note about the code below me for people to read. I don\'t have any other purpose.',
                        description: 'Tooltip for a block that is a comment.'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        COMMENT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'This program says "Hello world!"'
                        }
                    }
                },
                {
                    opcode: 'commentCBlock',
                    text: formatMessage({
                        id: 'tw.block.commentCBlock',
                        default: 'explain code [COMMENT]',
                        description: 'Block that is a comment.'
                    }),
                    tooltip: formatMessage({
                        id: 'tw.blockTooltip.commentCBlock',
                        // eslint-disable-next-line max-len
                        default: 'I am a note about the code inside me for people to read. I run the code inside me every time.',
                        description: 'Tooltip for a block that is a comment.'
                    }),
                    blockType: BlockType.CONDITIONAL,
                    arguments: {
                        COMMENT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'This program says "Hello world!"'
                        }
                    }
                },
                {
                    opcode: 'noOpCBlock',
                    text: formatMessage({
                        id: 'tw.block.noOpCBlock',
                        default: 'comment out',
                        description: 'Block that is no-op.'
                    }),
                    tooltip: formatMessage({
                        id: 'tw.blockTooltip.noOpCBlock',
                        default: 'I make the code inside me not run.',
                        description: 'Tooltip for a block that is no-op.'
                    }),
                    blockType: BlockType.CONDITIONAL
                },
                // lk: TODO: Move these into a HTML extension.
                {
                    opcode: 'renderMarkdown',
                    text: formatMessage({
                        id: 'tw.block.renderMarkdown',
                        default: 'render Markdown to HTML [MARKDOWN]',
                        description: 'Block that renders Markdown to HTML.'
                    }),
                    tooltip: formatMessage({
                        id: 'tw.blockTooltip.renderMarkdown',
                        default: 'I convert Markdown to HTML.',
                        description: 'Tooltip for a block that renders Markdown to HTML.'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        MARKDOWN: {
                            type: ArgumentType.STRING,
                            defaultValue: '*Hello* **World**!'
                        }
                    }
                },
                {
                    opcode: 'sanitizeXML',
                    text: formatMessage({
                        id: 'tw.block.sanitizeXML',
                        default: 'sanitize HTML/XML [XML]',
                        description: 'Block that sanitizes JavaScript out of XML.'
                    }),
                    tooltip: formatMessage({
                        id: 'tw.blockTooltip.sanitizeXML',
                        // eslint-disable-next-line max-len
                        default: 'I neutralize XML/SGML-like markup with JavaScript (HTML, SVG, and etc.) by stripping out JavaScript. Useful for security.',
                        description: 'Tooltip for a block that sanitizes JavaScript out of XML.'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        XML: {
                            type: ArgumentType.STRING,
                            defaultValue: '<img src="sillylittleimage.webp" onerror="alert(\'Silly little XSS :P\')">'
                        }
                    }
                },
                {
                    opcode: 'escapeXML',
                    text: formatMessage({
                        id: 'tw.block.escapeXML',
                        default: 'escape HTML/XML [XML]',
                        description: 'Block that converts XML to text.'
                    }),
                    tooltip: formatMessage({
                        id: 'tw.blockTooltip.escapeXML',
                        // eslint-disable-next-line max-len
                        default: 'I neutralize XML/SGML-like markup (HTML, XML, and etc.) by converting the unsafe characters to the equivelant character entity references. Useful for security.',
                        description: 'Tooltip for a block that converts XML to text.'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        XML: {
                            type: ArgumentType.STRING,
                            defaultValue: '<img src="sillylittleimage.webp" onerror="alert(\'Silly little XSS :P\')">'
                        }
                    }
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

    checkDarkMode () {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    startHats (args, util) {
        util.startHats(Cast.toString(args.HAT_TYPE));
    }

    exponentiation (args) {
        return Cast.toNumber(args.ONE) ** Cast.toNumber(args.TWO);
    }

    regex (args) {
        return Cast.toString(args.STRING)
            .match(new RegExp(Cast.toString(args.REGEX)));
    }

    replaceOperation (args) {
        return Cast.toString(args.STRING)
            .replace(Cast.toNumber(args.ONE), Cast.toNumber(args.TWO));
    }

    true () {
        return true;
    }
    pi () {
        return '3.141592653589793238462643383279502884197';
    }
    e () {
        return '2.7182818284590452353602874713527';
    }

    infinity () {
        return Infinity;
    }

    false () {
        return false;
    }

    strictlyEquals (args) {
        // We don't cast on purpose for compatibility reasons.
        return args.ONE === args.TWO;
    }

    booleanify (args) {
        return Cast.toBoolean(args.REPORTER);
    }

    substring (args) {
        return Cast.toString(args.STRING).substring(Cast.toNumber(args.BEGINNING) - 1, Cast.toNumber(args.END) - 1);
    }

    greenFlag () {
        this.runtime.greenFlag();
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

    renderMarkdown (args) {
        return markdown().render(Cast.toString(args.MARKDOWN));
    }

    sanitizeXML (args) {
        return DOMPurify.sanitize(Cast.toString(args.XML));
    }

    escapeXML (args) {
        return xmlEscape(Cast.toString(args.XML));
    }

}

module.exports = TurboWarpBlocks;

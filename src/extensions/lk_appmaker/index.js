const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const { setupUnsandboxedExtensionAPI } = require('../../extension-support/tw-unsandboxed-extension-runner')

const Swal = require('sweetalert2');

// Icon Credits: https://freesvg.org/index.php/software-icon-clip-art, dedicated to the public domain.

const iconURI = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4Mj0iMCIgeTI9Ii41IiBzcHJlYWRNZXRob2Q9InJlZmxlY3QiPjxzdG9wIHN0b3AtY29sb3I9IiM5MDhkYmUiIG9mZnNldD0iMCIvPjxzdG9wIHN0b3AtY29sb3I9IiM1ZTVjODQiIG9mZnNldD0iLjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDI9IjEiIHkxPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjOTk5IiBvZmZzZXQ9IjAiLz48c3RvcCBvZmZzZXQ9Ii41Ii8+PHN0b3Agc3RvcC1jb2xvcj0iIzk5OSIgb2Zmc2V0PSIxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9InVybCgjYSkiLz48cmVjdCB3aWR0aD0iMy43IiBoZWlnaHQ9IjYuMiIgeD0iMjAuNyIgeT0iNi41IiByeT0iMiIgcng9IjIiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA2NzgsMC43MDcxMDY3OCwwLjcwNzEwNjc4LC0wLjcwNzEwNjc4LDAsMCkiLz48cmVjdCB3aWR0aD0iMy43IiBoZWlnaHQ9IjYuMiIgeD0iMTUuNiIgeT0iNCIgcng9IjIiIHJ5PSIyIi8+PHJlY3Qgd2lkdGg9IjMuNyIgaGVpZ2h0PSI2LjIiIHg9IjEyLjYiIHk9Ii0yOCIgcnk9IjIiIHJ4PSIyIiB0cmFuc2Zvcm09Im1hdHJpeCgwLDEsLTEsMCwwLDApIi8+PHJlY3Qgd2lkdGg9IjMuNyIgaGVpZ2h0PSI2LjIiIHg9Ii00IiB5PSIyNi45IiB0cmFuc2Zvcm09Im1hdHJpeCgtMC43MDcxMDY3OCwwLjcwNzEwNjc4LDAuNzA3MTA2NzgsMC43MDcxMDY3OCwwLDApIiByeD0iMiIgcnk9IjIiLz48cmVjdCB3aWR0aD0iMy43IiBoZWlnaHQ9IjYuMiIgeD0iLTMuOSIgeT0iMTIuMiIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuNzA3MTA2NzgsMC43MDcxMDY3OCwwLjcwNzEwNjc4LDAuNzA3MTA2NzgsMCwwKSIgcng9IjIiIHJ5PSIyIi8+PGNpcmNsZSBjeD0iMTcuNSIgY3k9IjE0LjUiIHI9IjUuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjQiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjIwIiByPSI3LjUiIGZpbGw9InVybCgjYikiIHN0cm9rZT0iI2ZmZiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMjAiIHI9IjIiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+'

/**
 * Class for AppMaker blocks
 * @constructor
 */
class AppMaker {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        setupUnsandboxedExtensionAPI(vm);
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'appmaker',
            name: 'App Utilities',
            color1: '#7000d9',
            color2: '#5400a3',
            color3: '#39006e',
            menuIconURI: iconURI,
            blockIconURI: iconURI,
            // docsURI: 'https://docs.turbowarp.org/blocks',
            blocks: [
                {
                    opcode: 'showAlert',
                    text: formatMessage({
                        id: 'lk_appmaker.blocks.showAlert',
                        default: 'show [ALERT_TYPE] with the icon [ICON], the title [TITLE], and the text [TEXT]',
                        description: 'Block that shows an alert'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ALERT_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'ALERT_TYPE_MENU'
                        },
                        TITLE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'It worked!'
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Yippee!'
                        },
                        ICON: {
                            type: ArgumentType.STRING,
                            defaultValue: 'success',
                            menu: 'ICON_MENU'
                        }
                    }
                },
                {
                    opcode: 'showAlertThenWait',
                    text: formatMessage({
                        id: 'lk_appmaker.blocks.showAlertThenWait',
                        default: 'show [ALERT_TYPE] with the icon [ICON], the title [TITLE], and the text [TEXT], then wait',
                        description: 'Block that shows an alert then waits'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        ALERT_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'ALERT_TYPE_MENU'
                        },
                        TITLE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'It worked!'
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Yippee!'
                        },
                        ICON: {
                            type: ArgumentType.STRING,
                            defaultValue: 'success',
                            menu: 'ICON_MENU'
                        }
                    }
                },
                {
                    opcode: 'confirmDialog',
                    text: formatMessage({
                        id: 'lk_appmaker.blocks.confirm',
                        default: 'show confirm dialog with the icon [ICON], the title [TITLE], and the text [TEXT]',
                        description: 'Block that shows a confirm dialog'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        TITLE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Do you want to continue?'
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                        },
                        ICON: {
                            type: ArgumentType.STRING,
                            defaultValue: 'question',
                            menu: 'ICON_MENU'
                        }
                    }
                },
                {
                    opcode: 'inputDialog',
                    text: formatMessage({
                        id: 'lk_appmaker.blocks.inputDialog',
                        default: 'show input dialog with the icon [ICON], the title [TITLE], and the text [TEXT]',
                        description: 'Block that shows a confirm dialog'
                    }),
                    blockType: BlockType.REPORTER,
                    arguments: {
                        TITLE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'What\'s your name?'
                        },
                        TEXT: {
                            type: ArgumentType.STRING,
                        },
                        ICON: {
                            type: ArgumentType.STRING,
                            defaultValue: 'question',
                            menu: 'ICON_MENU'
                        }
                    }
                },
                {
                    opcode: 'executeJS',
                    text: formatMessage({
                        id: 'lk_appmaker.blocks.executeJS',
                        default: 'execute JavaScript [JS]',
                        description: 'Block that executes JavaScript'
                    }),
                    blockType: BlockType.COMMAND,
                    arguments: {
                        JS: {
                            type: ArgumentType.STRING,
                            defaultValue: 'alert("Hello!");'
                        }
                    }
                },
                {
                    opcode: 'executeJSReporter',
                    text: formatMessage({
                        id: 'lk_appmaker.blocks.executeJSReporter',
                        default: 'execute JavaScript [JS]',
                        description: 'Block that executes JavaScript'
                    }),
                    blockType: BlockType.BOOLEAN,
                    arguments: {
                        JS: {
                            type: ArgumentType.STRING,
                            defaultValue: 'true;'
                        }
                    }
                },
            ],
            menus: {
                ALERT_TYPE_MENU: {
                    items: ['alert', 'toast']
                },
                ICON_MENU: {
                    acceptReporters: true,
                    items: ['none', 'success', 'error', 'warning', 'info', 'question']
                }
            }
        };
    }

    showAlert(args) {
        Swal.fire({
            toast: args.ALERT_TYPE === 'toast',
            titleText: args.TITLE,
            text: args.TEXT,
            icon: args.ICON === 'none' ? undefined : args.ICON,
            position: args.ALERT_TYPE === 'toast' ? 'top-end' : 'center',
            showConfirmButton: args.ALERT_TYPE != 'toast',
            timer: args.ALERT_TYPE === 'toast' ? 2500 : undefined,
            timerProgressBar: args.ALERT_TYPE === 'toast',
        });
    }

    async showAlertThenWait(args) {
        await Swal.fire({
            toast: args.ALERT_TYPE === 'toast',
            titleText: args.TITLE,
            text: args.TEXT,
            icon: args.ICON === 'none' ? undefined : args.ICON,
            position: args.ALERT_TYPE === 'toast' ? 'top-end' : 'center',
            showConfirmButton: args.ALERT_TYPE != 'toast',
            timer: args.ALERT_TYPE === 'toast' ? 2500 : undefined,
            timerProgressBar: args.ALERT_TYPE === 'toast',
        })
    }

    confirmDialog(args) {
        return Swal.fire({
            titleText: args.TITLE,
            text: args.TEXT,
            icon: args.ICON === 'none' ? undefined : args.ICON,
            showCancelButton: true,
        }).then((result) => {return result.isConfirmed;});
    }

    async inputDialog(args) {
        const { value: value } = await Swal.fire({
            titleText: args.TITLE,
            input: 'text',
            text: args.TEXT,
            icon: args.ICON === 'none' ? undefined : args.ICON,
        });
        return value;
    }


    executeJS(args) {
        if (this.runtime.isPackaged || new URL(location.href).searchParams.has('danger')) {
            (Scratch => {eval(args.JS)})(Scratch);
        } else {
            if (confirm(`Do you want to execute this JavaScript code? (if you don't understand it don't run it):
${args.JS}`)) {
                (Scratch => {eval(args.JS)})(Scratch);
            }
        }
    }
    executeJSReporter(args) {
        if (this.runtime.isPackaged || new URL(location.href).searchParams.has('danger')) {
            return (Scratch => {return eval(args.JS)})(Scratch);
        } else {
            if (confirm(`Do you want to execute this JavaScript code? (if you don't understand it don't run it):
${args.JS}`)) {
                return (Scratch => {return eval(args.JS)})(Scratch);
            }
        }
    }
}

module.exports = AppMaker;

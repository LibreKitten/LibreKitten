const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');
const { setupUnsandboxedExtensionAPI } = require('../../extension-support/tw-unsandboxed-extension-runner')
const vm = require('../../virtual-machine.js');    

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
            id: 'server',
            name: 'LibreKitten on server',
            color1: '#7000d9',
            color2: '#5400a3',
            color3: '#39006e',
            menuIconURI: iconURI,
            blockIconURI: iconURI,
            // docsURI: 'https://docs.turbowarp.org/blocks',
            blocks: [
                {
                    opcode: 'whenPageIsRequested',
                    text: formatMessage({
                        id: 'lk_server.blocks.whenPageIsRequested',
                        default: 'when page [PAGE] is requested',
                        description: 'Hat that executes the the code under it when a certain page is requested.'
                    }),
                    blockType: BlockType.EVENT,
                    arguments: {
                        PAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: '/'
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

    /**
     * Shows an alert with the given parameters.
     * 
     * @param {Object} args - The arguments for the alert.
     * @param {string} args.ALERT_TYPE - The type of alert to show. It can be either 'alert' or 'toast'.
     * @param {string} args.TITLE - The title of the alert.
     * @param {string} args.TEXT - The text content of the alert.
     * @param {string} args.ICON - The icon to display with the alert. It can be one of the following: 'none', 'uccess', 'error', 'warning', 'info', 'question'.
     * 
     * @returns {void}
     */
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

    /**
     * Shows an alert with the given parameters and waits for it to be dismissed.
     * 
     * @param {Object} args - The arguments for the alert.
     * @param {string} args.ALERT_TYPE - The type of alert to show. It can be either 'alert' or 'toast'.
     * @param {string} args.TITLE - The title of the alert.
     * @param {string} args.TEXT - The text content of the alert.
     * @param {string} args.ICON - The icon to display with the alert. It can be one of the following: 'none', 'uccess', 'error', 'warning', 'info', 'question'.
     * 
     * @returns {Promise<void>} - A promise that resolves when the alert is dismissed.
     */
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

    /**
     * Shows a confirm dialog with the given parameters.
     * 
     * @param {Object} args - The arguments for the confirm dialog.
     * @param {string} args.TITLE - The title of the confirm dialog.
     * @param {string} args.TEXT - The text content of the confirm dialog.
     * @param {string} args.ICON - The icon to display with the confirm dialog. It can be one of the following: 'none', 'uccess', 'error', 'warning', 'info', 'question'.
     * 
     * @returns {Promise<boolean>} - A promise that resolves with a boolean value indicating whether the user confirmed the dialog (true) or canceled it (false).
     */
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
        if (this.runtime.isPackaged) {
            new Function(args.JS)();
        } else {
            if (confirm(`Do you want to execute this JavaScript code? (if you don't understand it don't run it):
${args.JS}`)) {
                new Function(args.JS)();
            }
        }
    }
    executeJSReporter(args) {
        if (this.runtime.isPackaged) {
            return new Function(args.JS)();
        } else {
            if (confirm(`Do you want to execute this JavaScript code? (if you don't understand it don't run it):
${args.JS}`)) {
                return new Function(args.JS)();
            };
        }
    }
}

module.exports = AppMaker;

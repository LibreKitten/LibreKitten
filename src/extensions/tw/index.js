const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const Cast = require('../../util/cast');

// eslint-disable-next-line max-len
const iconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4Ni4zNjEyOCIgaGVpZ2h0PSI3Ny40MTM4MiIgdmlld0JveD0iMCwwLDg2LjM2MTI4LDc3LjQxMzgyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAxLjczMzMyLC0xNDEuMjkzMDkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwOS4zODQyNSwxODMuMzA4N2MwLC0xOS41NDk4OSAxNS44NDgzMiwtMzUuMzk4MjEgMzUuMzk4MjEsLTM1LjM5ODIxYzE5LjU0OTg5LDAgMzUuMzk4MjIsMTUuODQ4MzIgMzUuMzk4MjIsMzUuMzk4MjFjMCwxOS41NDk4OSAtMTUuODQ4MzIsMzUuMzk4MjEgLTM1LjM5ODIyLDM1LjM5ODIxYy0xOS41NDk4OSwwIC0zNS4zOTgyMSwtMTUuODQ4MzIgLTM1LjM5ODIxLC0zNS4zOTgyMXoiIGZpbGw9IiNmNGY0ZjQiIHN0cm9rZT0iI2U2ZTZlNiIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yMTMuMTE5MDUsMTY3LjkxMDU5bDAuMTc1OSwtMjYuNjE3NWwxNi45OTE3Miw5LjgyMjE2YzAsMCAtNi45NDQwMSwzLjc4MzAxIC05LjQyNjU2LDYuMjU1ODljLTIuNzI4NDIsMi43MTc3OSAtNy43NDEwNiwxMC41Mzk0NiAtNy43NDEwNiwxMC41Mzk0NnoiIGZpbGw9IiNmNGY0ZjQiIHN0cm9rZT0iI2U2ZTZlNiIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yMzguNDQ4NSwxNzAuMTQwNDRjMCwzLjU5NzE4IC0zLjQyMzI0LDYuNTEzMjcgLTcuNjQ2MDIsNi41MTMyN2MtNC4yMjI3OCwwIC03LjY0NjAyLC0yLjkxNjA5IC03LjY0NjAyLC02LjUxMzI3YzAsLTMuNTk3MTggMy40MjMyNCwtNi41MTMyOCA3LjY0NjAyLC02LjUxMzI4YzQuMjIyNzgsMCA3LjY0NjAyLDIuOTE2MSA3LjY0NjAyLDYuNTEzMjh6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNmU2ZTYiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjY1LjYzNDMzLDE3MC4xNDA0NGMwLDMuNTk3MTggLTMuNDIzMjQsNi41MTMyNyAtNy42NDYwMiw2LjUxMzI3Yy00LjIyMjc4LDAgLTcuNjQ2MDEsLTIuOTE2MDkgLTcuNjQ2MDEsLTYuNTEzMjdjMCwtMy41OTcxOCAzLjQyMzIzLC02LjUxMzI4IDcuNjQ2MDEsLTYuNTEzMjhjNC4yMjI3OCwwIDcuNjQ2MDIsMi45MTYxIDcuNjQ2MDIsNi41MTMyOHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2U2ZTZlNiIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yMzIuMDc2ODEsMTcwLjE0MDQ0YzAsMS41MjQ4OSAtMC41NzA1MiwyLjc2MTA2IC0xLjI3NDMyLDIuNzYxMDZjLTAuNzAzOCwwIC0xLjI3NDM0LC0xLjIzNjE3IC0xLjI3NDM0LC0yLjc2MTA2YzAsLTEuNTI0ODkgMC41NzA1NCwtMi43NjEwNyAxLjI3NDM0LC0yLjc2MTA3YzAuNzAzOCwwIDEuMjc0MzIsMS4yMzYxOCAxLjI3NDMyLDIuNzYxMDd6IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjYzLjQzOTY1LDE5NS4zNDM5NmMwLDAgLTMuMDgzMTQsOC4wMDQyMyAtOC4zMDI4OCw3LjYzMzgxYy0yLjg0MjQ1LC0wLjIwMTcyIC05Ljg5Mjg2LC04LjM0OTA4IC05Ljg5Mjg2LC04LjM0OTA4YzAsMCAtOC42NTAzOCw3LjA4Njk1IC0xMC45NzI0LDcuMDg2OTVjLTQuMjI2NjgsMCAtNy41MDQ0MiwtNy41MDQ0MiAtNy41MDQ0MiwtNy41MDQ0MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNDUuMDMyNTcsMTgyLjMxNzQydjEyLjQ2MDE3IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI0MS4yMDk1NiwxODIuMzE3NDJjMCwtMi4xMTEzOSAtMC4yNzA2OSwtMy44MjMgMy44MjMsLTMuODIzYzMuODEwNSwwIDMuODIzMDEsMS43MTE2MSAzLjgyMzAxLDMuODIzYzAsMi4xMTEzOSAtMS43MTE2MiwzLjgyMzAxIC0zLjgyMzAxLDMuODIzMDFjLTIuMTExMzksMCAtMy44MjMsLTEuNzExNjIgLTMuODIzLC0zLjgyMzAxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjAyLjEzOTgzLDE3NS44MjY1N2wzOS4xMjYwNSw0LjA2OTExIiBmaWxsPSIjMDBmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjQxLjQyMjM5LDE4Mi4zOTk3NGgtMzkuNDM5MDYiIGZpbGw9IiMwMGZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMDIuMTM5ODMsMTg4LjgwODI4bDM5LjEyNjA1LC00LjA2OTExIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iIzAwZmZmZiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI4Ny42ODgwOSwxNzYuMDE5OTlsLTM5LjEyNjA2LDQuMDY5MTEiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjMDBmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjg3Ljg0NDYxLDE4Mi41OTMxNmgtMzkuNDM5MDciIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjMDBmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjQ4LjU2MjA0LDE4NC45MzI2bDM5LjEyNjA2LDQuMDY5MTEiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjMDBmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjc2LjQ4NjY3LDE2Ny45MTA2YzAsMCAtNS4wMTI2NCwtNy44MjE2NyAtNy43NDEwNiwtMTAuNTM5NDZjLTIuNDgyNTUsLTIuNDcyODggLTkuNDI2NTYsLTYuMjU1ODkgLTkuNDI2NTYsLTYuMjU1ODlsMTYuOTkxNzIsLTkuODIyMTZsMC4xNzU5LDI2LjYxNzV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2Y0ZjRmNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTI1OS4yNjI2NCwxNzAuMTQwNDRjMCwxLjUyNDg5IC0wLjU3MDUyLDIuNzYxMDYgLTEuMjc0MzIsMi43NjEwNmMtMC43MDM4LDAgLTEuMjc0MzQsLTEuMjM2MTcgLTEuMjc0MzQsLTIuNzYxMDZjMCwtMS41MjQ4OSAwLjU3MDU0LC0yLjc2MTA3IDEuMjc0MzQsLTIuNzYxMDdjMC43MDM4LDAgMS4yNzQzMiwxLjIzNjE4IDEuMjc0MzIsMi43NjEwN3oiIGZpbGw9IiMwMDAwMDAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjM4LjI2NjY3NDk5OTk5OTk5OjM4LjcwNjkwOTk5OTk5OTk5LS0+';

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
            name: 'LibreKitten',
            color1: '#ff8200',
            color2: '#d16c00',
            color3: '#a85700',
            docsURI: 'https://docs.turbowarp.org/blocks',
            menuIconURI: iconURI,
            blockIconURI: iconURI,
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
                        id: 'lk.blocks.checkDarkMode',
                        default: 'is system dark mode on?',
                        description: 'Block that returns if the system dark mode is on.'
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
}

module.exports = TurboWarpBlocks;

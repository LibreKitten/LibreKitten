// TODO: Translations

// const formatMessage = require('format-message');
const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');

const SQLiteWrapper = require('./sql-abstraction').default;
const SQL = new SQLiteWrapper();

(async () => {
    await SQL.init();
})();

/**
 * lk: Blocks to provide SQLite to projects.
 * @constructor
 */
class SQLite {
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
            id: 'sql',
            name: 'Database',
            color1: '#7000d9',
            color2: '#5400a3',
            color3: '#39006e',
            // Attribution: freesvg.org/vector-drawing-of-database-server
            blockIconURI: require('./database_server.svg'),
            blocks: [
                {
                    opcode: 'createTable',
                    text: 'create table [NAME] with columns [COLUMNS]',
                    arguments: {
                        NAME: {
                            type: ArgumentType.STRING,
                            defaultValue: 'CATS'
                        },
                        COLUMNS: {
                            type: ArgumentType.STRING,
                            defaultValue: '(name, isKitten)'
                        }
                    },
                    blockType: BlockType.COMMAND
                }
            ]
        };
    }

    createTable (args) {
        SQL.createTable(args.NAME, args.COLUMNS);
    }
}

module.exports = SQLite;

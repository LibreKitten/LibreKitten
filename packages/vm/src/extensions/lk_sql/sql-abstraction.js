/* eslint-env browser, node */
const SQLBrowser = require('sql.js');
const SQLServer = require('sqlite3');

/**
 * Cross-platform SQLite wrapper class.
 */
class SQLiteWrapper {
    constructor () {
        this._isNode = typeof process !== 'undefined' && process.versions?.node;
        this.db = this._isNode ? new SQLServer.Database(':memory:') : new SQLBrowser.Database();
    }

    /**
     * Escape table/column identifiers safely.
     */
    _escapeIdentifier (name) {
        if (typeof name !== 'string') throw new Error('Identifier must be a string');
        return `"${name.replace(/"/g, '""')}"`;
    }

    /**
     * Securely parses a column definition string and escapes identifiers.
     * Example input: "id INT, name TEXT"
     * Output: `"id" INT, "name" TEXT`
     */
    _parseColumns (colStr) {
        const cols = colStr.split(/,(?![^(]*\))/g).map(c => c.trim());
        return cols.map(c => {
            const [first, ...rest] = c.split(/\s+/);
            if (!first) throw new Error(`Invalid column definition: ${c}`);
            return [this._escapeIdentifier(first), ...rest].join(' ');
        }).join(', ');
    }

    /**
     * Creates a new table in SQLite with secure column parsing.
     * @param {string} tableName - Table name
     * @param {string} columns - Column definitions, e.g. "id INT, name TEXT"
     * @returns {Promise<void>}
     */
    createTable (tableName, columns) {
        const sqlColumns = this._parseColumns(columns);
        const sql = `CREATE TABLE ${this._escapeIdentifier(tableName)} (${sqlColumns});`;

        if (this._isNode) {
            return new Promise((resolve, reject) => {
                this.db.run(sql, err => (err ? reject(err) : resolve()));
            });
        }
        this.db.run(sql);
        return Promise.resolve();
        
    }

    /**
     * Run any arbitrary SQL query (with values array for parameterization)
     * @param {string} sql
     * @param {Array} [params]
     * @returns {Promise<any>}
     */
    runSQL (sql, params = []) {
        if (this._isNode) {
            return new Promise((resolve, reject) => {
                this.db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
            });
        }
        const stmt = this.db.prepare(sql);
        stmt.bind(params);
        const result = [];
        while (stmt.step()) {
            result.push(stmt.getAsObject());
        }
        stmt.free();
        return Promise.resolve(result);
        
    }
}

module.exports = SQLiteWrapper;

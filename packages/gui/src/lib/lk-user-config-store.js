import log from './log.js';

const safeLocalStorageGet = key => {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        log.error(e);
        return null;
    }
};

class UserConfigError extends Error {
    constructor (...args) {
        super(...args);
        this.name = 'UserConfigError';
    }
}

class UserConfigTypeError extends TypeError {
    constructor (...args) {
        super(...args);
        this.name = 'UserConfigTypeError';
    }
}

export const UserConfigEvents = {
    PROPERTY_SET: 'PROPERTY_SET'
};

/**
 * lk: A key-value configuration store that is a type-ensured wrapper on top of Local Storage.
 * @constructor
 */
class UserConfigStore extends EventTarget {
    #initialized = false;
    #validProperties;
    #properties;
    #supportedTypes;

    constructor () {
        super();
        this.#validProperties = new Map([
            ['lk:menu-bar-slidable', 'boolean'],
            ['tw:closedNews', 'string'],
            ['tw:windchime_opt_out', 'boolean'],
            ['tw:language', 'string'],
            ['tw:persisted_unsandboxed', 'boolean'],
            ['tw:restore-point-interval', 'number'],
            ['tw:username', 'string'],
            ['tw:theme', 'object']
        ]);
        this.#properties = new Map();
        this.#supportedTypes = [
            'string',
            'number',
            'boolean',
            'object'
        ];

        this.init();
    }

    /**
     * Load all user settings into the class.
     */
    init () {
        if (this.#initialized) throw new UserConfigError('User configuration is already initialised.');
        this.#initialized = true;

        const properties = this.#properties;

        for (const [propName, propType] of this.#validProperties) {
            const rawValue = safeLocalStorageGet(propName);
            if (rawValue === null) continue;

            const castedValue = this.#castFromString(rawValue, propType, propName);
            properties.set(propName, castedValue);
        }
    }

    #castFromString (string, typeToCastAs, propName) {
        switch (typeToCastAs) {
        case 'string':
            return string;
        case 'number': {
            const convertedValue = Number(string);
            if (Number.isNaN(convertedValue)) {
                // eslint-disable-next-line max-len
                log.warn(`config-store: Stored numerical user property should never evaluate to NaN. Property was "${propName}"`);
                return 0;
            }

            return convertedValue;
        }
        case 'boolean':
            return string === 'true';
        case 'object':
            try {
                return JSON.parse(string);
            } catch (e) {
                // eslint-disable-next-line max-len
                log.warn(`config-store: Property "${propName}" of type JSON was attempted to be parsed but it gave this error:\n${e.stack || e.name}`);
                return {};
            }
        default:
            // eslint-disable-next-line max-len
            throw new UserConfigError(`Property "${propName}" was attempted to be casted but the property was typed invalidly as "${typeToCastAs}".`);
        }
    }

    #castToString (value, propertyType, propName) {
        switch (propertyType) {
        case 'number':
            if (Number.isNaN(value)) {
                throw new UserConfigTypeError(
                    `Attempted to set numerical user property "${propName}" to NaN, which is not allowed.`);
            }
            return String(value);
        case 'object':
            try {
                return JSON.stringify(value);
            } catch (e) {
                throw new UserConfigTypeError(
                    `Attempted to set JSON property "${propName}" but stringifying errored:\n${e.stack || e.name}`);
            }
        default:
            return String(value);
        }
    }


    /**
     * Gets a property in the user configuration. Typing is ensured.
     * @param {string} key - The key of the property.
     * @param {string} type - The type of the property to get.
     * @returns {any} The gotten property.
     */
    get (key, type) {
        if (!this.#supportedTypes.includes(type)) {
            throw new UserConfigError(`Type "${type}" is not a supported type.`);
        }
        if (!this.#validProperties.has(key)) {
            throw new UserConfigError(`Property "${key}" is not registered as a valid property.`);
        }
        if (this.#validProperties.get(key) !== type) {
            // eslint-disable-next-line max-len
            throw new UserConfigTypeError(`Property "${key}" was attempted to be retrived as a "${type}" but it is not typed as one.`);
        }

        const value = this.#properties.get(key) ?? null;
        return value;
    }

    /**
     * Sets a property in the user configuration.
     * @param {string} key - The key of the property to set.
     * @param {any} value - The value of the property to set.
     * @returns {any} The set property returned back.
     */
    set (key, value) {
        if (!this.#validProperties.has(key)) {
            throw new UserConfigError(`Property "${key}" is not registered as a valid property.`);
        }
        const propertyType = this.#validProperties.get(key);
        if (typeof value !== propertyType) {
            // eslint-disable-next-line max-len
            throw new UserConfigTypeError(`Property "${key}" was attempted to be set with a ${typeof value} value but it is typed as a ${propertyType}.`);
        }
        localStorage.setItem(key, this.#castToString(value, propertyType, key)); // This is uncaught on purpose.
        this.#properties.set(key, value);

        this.dispatchEvent(new CustomEvent(UserConfigEvents.PROPERTY_SET, {
            detail: {key, value}
        }));

        return value;
    }
}

const userConfigStore = new UserConfigStore();
window.Config = userConfigStore; // Exported for debugging.
export default userConfigStore;

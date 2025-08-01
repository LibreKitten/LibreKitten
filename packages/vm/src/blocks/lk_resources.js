const Cast = require('../util/cast');

class LkResourcesBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            resources_get: this.getResource
        };
    }

    getResource (args, util) {
        const target = util.target;

        const resourceI = target.getResourceIndexByName(Cast.toString(args.RESOURCE_INPUT));
        if (resourceI === -1) return '';
        const resource = target.sprite.resources[resourceI];

        if (!resource.text) return '';
        return resource.text;
    }
}

module.exports = LkResourcesBlocks;

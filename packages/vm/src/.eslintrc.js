module.exports = {
    root: true,
    extends: ['scratch', 'scratch/es6'],
    ignorePatterns: ['parser/test/**/*'],
    env: {
        browser: true
    },
    rules: {
        'valid-jsdoc': 'off'
    }
};

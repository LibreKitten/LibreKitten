const test = require('tap').test;
const {makePathResolver} = require('../../src/server/resolve-path');

const pathResolver = makePathResolver(() => '/cats/rule', () => '/dogs/drool');

test('path resolver smoke', t => {
    t.equal(pathResolver('/house/hooman'), '/house/hooman');
    t.end();
});

test('path resolver can resolve dots?', t => {
    t.equal(pathResolver('/house/hooman/.'), '/house/hooman');
    t.equal(pathResolver('/house/hooman/..'), '/house');

    t.equal(pathResolver('.'), '/dogs/drool');
    t.equal(pathResolver('..'), '/dogs');

    t.equal(pathResolver('./!'), '/dogs/drool/!');
    t.equal(pathResolver('../rule'), '/dogs/rule');

    t.end();
});

test('path resolver can resolve tilde?', t => {
    t.equal(pathResolver('~'), '/cats/rule');
    t.equal(pathResolver('~/!'), '/cats/rule/!');

    // Make sure things don't go awry.
    t.not(pathResolver('/oop/~'), '/cats/rule');
    t.not(pathResolver('/oop/~'), '/oop/cats/rule');

    t.not(pathResolver('/oop/~/!'), '/cats/rule/!');
    t.not(pathResolver('/oop/~/!'), '/oop/cats/rule/!');

    t.end();
});

test('path resolver throws on incorrect types', t => {
    t.throws(
        () => makePathResolver('incorrect', () => 'correct'),
        'path resolver wrapper function should throw when homeDir is not a function'
    );
    t.throws(
        () => makePathResolver(() => 'correct', 'incorrect'),
        'path resolver wrapper function should throw when workingDir is not a function'
    );

    t.throws(
        () => pathResolver(-1),
        'path resolver should throw when location is not a string'
    );

    t.end();
});

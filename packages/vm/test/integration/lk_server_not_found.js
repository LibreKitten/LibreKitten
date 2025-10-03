const path = require('path');
const test = require('tap').test;
const makeTestStorage = require('../fixtures/make-test-storage');
const readFileToBuffer = require('../fixtures/readProjectFile').readFileToBuffer;
const VirtualMachine = require('../../src/index');
const Runtime = require('../../src/engine/runtime');

const projectUri = path.resolve(__dirname, '../fixtures/lk-server-not-found.lb');
const project = readFileToBuffer(projectUri);

const EXAMPLE_UUID = '7f14d08d-4ef8-47ec-b90f-864b4b1ec5ec';

test('when page not found responds to invalid page', t => {
    const vm = new VirtualMachine();
    vm.attachStorage(makeTestStorage());

    vm.runtime.on(Runtime.SERVER_RESPONSE, content => {
        t.equal(content, 'false');

        vm.quit();
        t.end();
    });

    vm.start();
    vm.clear();
    vm.setCompatibilityMode(false);
    vm.setTurboMode(false);
    vm.loadProject(project).then(() => {
        vm.greenFlag();
        vm.runtime.emit(
            Runtime.SERVER_REQUEST,
            '/404',
            '0.0.0.0',
            'GET',
            '{}',
            '',
            EXAMPLE_UUID
        );
    });
});

test('when page not found must not respond on valid page', t => {
    const vm = new VirtualMachine();
    vm.attachStorage(makeTestStorage());

    vm.runtime.on(Runtime.SERVER_RESPONSE, content => {
        t.equal(content, 'true');

        vm.quit();
        t.end();
    });

    vm.start();
    vm.clear();
    vm.setCompatibilityMode(false);
    vm.setTurboMode(false);
    vm.loadProject(project).then(() => {
        vm.greenFlag();
        vm.runtime.emit(
            Runtime.SERVER_REQUEST,
            '/',
            '0.0.0.0',
            'GET',
            '{}',
            '',
            EXAMPLE_UUID
        );
    });
});

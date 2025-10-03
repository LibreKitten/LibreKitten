const path = require('path');
const test = require('tap').test;
const makeTestStorage = require('../fixtures/make-test-storage');
const readFileToBuffer = require('../fixtures/readProjectFile').readFileToBuffer;
const VirtualMachine = require('../../src/index');
const Runtime = require('../../src/engine/runtime');

const projectUri = path.resolve(__dirname, '../fixtures/lk-server-smoke.lb');
const project = readFileToBuffer(projectUri);

const EXAMPLE_UUID = '7f14d08d-4ef8-47ec-b90f-864b4b1ec5ec';

test('server smoke test', t => {
    const vm = new VirtualMachine();
    vm.attachStorage(makeTestStorage());

    vm.runtime.on(Runtime.SERVER_RESPONSE, (content, mime, status, extraHeaders, requestId) => {
        let contentObject = null;
        try {
            contentObject = JSON.parse(content);
        } catch {
            vm.quit();
            t.fail('Failed to parse returned content.');
            t.end();
            return;
        }

        t.equal(contentObject.page, '/seek-his-wisdom');
        t.equal(contentObject.ipAddress, '0.0.0.0');
        t.ok(contentObject.requestMethodIsGET);
        t.equal(JSON.stringify(contentObject.requestHeaders), '{"testingTesting":123}');
        t.equal(contentObject.requestData, 'Hello Librekitty. I request your wisdom.');

        t.equal(mime, 'application/json');
        t.equal(status, 418);
        t.equal(extraHeaders, '{"theLibrekittyKnowsAll": true}');
        t.equal(requestId, EXAMPLE_UUID);

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
            '/seek-his-wisdom',
            '0.0.0.0',
            'GET',
            '{"testingTesting":123}',
            'Hello Librekitty. I request your wisdom.',
            EXAMPLE_UUID
        );
    });
});

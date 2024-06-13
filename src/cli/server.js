/* 
This is a web client for LibreKitten included in the LibreKitten Virtual Machine.
It is used to run projects with website capabilities on a web server.
*/

const EventEmitter = require('events');
const fs = require('fs');
const VirtualMachine = require('../index');
const http = require('http');
const makeTestStorage = require('../../test/fixtures/make-test-storage'); // Dirty hack to make storage work.
const { JSDOM } = require('jsdom');
let server;
let event;

/* eslint-env node */
/* eslint-disable no-console */

const events = new EventEmitter();

const file = process.argv[2];
if (!file) {
    throw new Error('Invalid file');
}

global.window = new JSDOM('').window;
global.document = window.document;

// Extension compatibility
global.confirm = ignored => { return true; };
global.alert = ignored => { console.log(ignored); };
global.prompt = (ignored, blahblahblah) => { return ''; };


const runProject = async buffer => {
    const vm = new VirtualMachine();
    vm.convertToPackagedRuntime();
    vm.attachStorage(makeTestStorage());
    server = http.createServer((req, res) => {
        /* res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Hello World\n'); */
        vm.runtime.emit('serverRequest', req.url, req.socket.remoteAddress, req.method);
        event = {
            get content() {
                return null;
            },
            set content(array) {
                res.writeHead(array[2], {
                    'Content-Type': array[1],
                    ...JSON.parse(array[3])
                });
                res.end(array[0]);
            }
        };
    });
    vm.runtime.on('SAY', (target, type, text) => {
        console.log(text);
    });
    vm.runtime.on('serverResponse', (content, mime, status, extraHeaders) => {
        event.content = [content, mime, status, extraHeaders];
    });
    vm.setCompatibilityMode(false);
    vm.setTurboMode(true);
    vm.clear();
    await vm.loadProject(buffer);
    vm.start();
    vm.greenFlag();
};

runProject(fs.readFileSync(file));
server.listen(process.argv[3] ?? 8080, () => {
    console.log(`LibreKitten on server has started.`);
})

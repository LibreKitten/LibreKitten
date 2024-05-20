/* 
This is a web server for LibreKitten included in the LibreKitten Virtual Machine.
It is used to run projects with web server capabilities on a web server.
*/

const EventEmitter = require('events');
const fs = require('fs');
const VirtualMachine = require('../index');
const http = require('http');
const makeTestStorage = require('../../test/fixtures/make-test-storage');
let server;
let event;

/* eslint-env node */
/* eslint-disable no-console */

const events = new EventEmitter();

const file = process.argv[2];
if (!file) {
    throw new Error('Invalid file');
}

// Extension compatibility
global.confirm = ignored => { return true; };
global.alert = ignored => {};
global.prompt = (ignored, blahblahblah) => { return ''; };


const runProject = async buffer => {
    const vm = new VirtualMachine()
    vm.convertToPackagedRuntime();
    vm.attachStorage(makeTestStorage());
    vm.runtime.on('SAY', (target, type, text) => {
        console.log(text);
    });
    vm.runtime.on('serverResponse', (content, mime, status) => {
        event.content = [content, mime, status];
    });
    server = http.createServer((req, res) => {
        /* res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Hello World\n'); */
        vm.runtime.emit('serverRequest', req.url);
        event = {
            get content() {
                return null;
            },
            set content(array) {
                res.writeHead(array[2], {
                    'Content-Type': array[1]
                });
                res.end(array[0]);
            }
        };
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

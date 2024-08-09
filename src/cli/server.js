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

const file = process.argv[2];
if (!file) {
    throw new Error('Invalid file');
}

global.window = new JSDOM('').window;
global.document = window.document;

// Extension compatibility
global.confirm = (...ignored) => { return true; };
global.alert = (ignored, ...ignored2) => { console.log(ignored); };
global.prompt = (...ignored) => { return ''; };


const runProject = async buffer => {
    let codeForPage = true;
    const vm = new VirtualMachine();
    vm.convertToPackagedRuntime();
    vm.attachStorage(makeTestStorage());
    server = http.createServer((req, res) => {
        /* res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Hello World\n'); */
        let data = '';
        req.on('data', (chunk) => {
            data = chunk;
        })
        req.on('end', async () => {
            if (dev && req.url === '/_lk_devServer_updateLb') {
                vm.clear();
                await vm.loadProject(data).catch((err) => {
                    throw new Error(err);
                });
                vm.start();
                vm.greenFlag();
                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'access-control-allow-origin': String(req.headers.origin) === 'http://localhost:8601' || String(req.headers.origin).endsWith('librekitten.org') ? req.headers.origin : 'http://invalid'
                });
                return res.end('success');
            };
            vm.runtime.emit('serverRequest', req.url, req.socket.remoteAddress, req.method, JSON.stringify(req.headers), data);
            codeForPage = false;
            event = {
                get content() {
                    return null;
                },
                set content(array) {
                    codeForPage = true;
                    res.writeHead(array[2], {
                        'Content-Type': array[1],
                        ...JSON.parse(array[3])
                    });
                    res.end(String(array[0]));
                }
            };
            setTimeout(() => {
                if (!codeForPage) {
                    vm.runtime.emit('server404', req.url, req.socket.remoteAddress, req.method, JSON.stringify(req.headers), data);
                    codeForPage = true;
                    event = {
                        get content() {
                            return null;
                        },
                        set content(array) {
                            codeForPage = true;
                            res.writeHead(array[2], {
                                'Content-Type': array[1],
                                ...JSON.parse(array[3])
                            });
                            res.end(String(array[0]));
                        }
                    };
                }
            }, 50);
        })
    });
    vm.runtime.on('SAY', (target, type, text) => {
        console.log(text);
    });
    vm.runtime.on('serverResponse', (content, mime, status, extraHeaders) => {
        event.content = [content, mime, status, extraHeaders];
    });
    vm.securityManager.getSandboxMode = (url) => {
        return Promise.resolve('unsandboxed');
    };
    vm.securityManager.canAutomaticallyLoadExtension = (url) => {
        return Promise.resolve(true);
    };
    vm.securityManager.canFetch = (url) => {
        return Promise.resolve(true);
    };
    // we literally can't so no
    vm.securityManager.canOpenWindow = (url) => {
        return Promise.resolve(false);
    };
    // we literally can't so no
    vm.securityManager.canRedirect = (url) => {
        return Promise.resolve(false);
    };
    vm.securityManager.canLoadExtensionFromProject = (url) => {
        return Promise.resolve(true);
    }
    vm.setCompatibilityMode(false);
    vm.setTurboMode(true);
    vm.clear();
    await vm.loadProject(buffer);
    vm.start();
    vm.greenFlag();
};

runProject(fs.readFileSync(file));
const port = process.argv[3] ?? 8080
const dev = process.argv[4] === '--dev';
server.listen(port, () => {
    console.log(`LibreKitten on server has started at port ${port}.`);
})

/*
This is a web client for LibreKitten included in the LibreKitten Virtual Machine.
It is used to run projects with website capabilities on a web server.
*/

/* eslint-env node */
/* eslint-disable no-console */

const fs = require('fs');
const VirtualMachine = require('../index');
const http = require('http');
const makeTestStorage = require('../../test/fixtures/make-test-storage'); // Dirty hack to make storage work.
const {JSDOM} = require('jsdom');
let server;
let event;

const file = process.argv[2];
if (!file) {
    throw new Error('Invalid file');
}

global.window = new JSDOM('').window;
global.document = window.document;

// Extension compatibility
/* eslint-disable-next-line no-unused-vars */
global.confirm = (...ignored) => true;
/* eslint-disable-next-line no-unused-vars */
global.alert = (ignored, ...ignored2) => {
    console.log(ignored);
};
/* eslint-disable-next-line no-unused-vars */
global.prompt = (...ignored) => '';

const port = process.argv[3] ?? 8080;
const dev = process.argv[4] === '--dev';

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
        req.on('data', chunk => {
            data = chunk;
        });
        req.on('end', async () => {
            if (dev && req.url === '/_lk_devServer_updateLb') {
                if (
                    String(req.headers.origin) === 'http://localhost:8601'
                    || String(req.headers.origin).endsWith('librekitten.org')
                ) {
                    return;
                }
                vm.clear();
                await vm.loadProject(data).catch(err => {
                    throw new Error(err);
                });
                vm.start();
                vm.greenFlag();
                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'access-control-allow-origin': String(req.headers.origin) === 'http://localhost:8601'
                        || String(req.headers.origin).endsWith('librekitten.org')
                        ? req.headers.origin : 'http://invalid'
                });
                return res.end('success');
            }
            vm.runtime.emit('serverRequest', req.url, req.socket.remoteAddress, req.method, JSON.stringify(req.headers), data);
            codeForPage = false;
            event = {
                get content () {
                    return null;
                },
                set content (array) {
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
                    vm.runtime.emit(
                        'server404',
                        req.url,
                        req.socket.remoteAddress,
                        req.method,
                        JSON.stringify(req.headers),
                        data
                    );
                    codeForPage = true;
                    event = {
                        get content () {
                            return null;
                        },
                        set content (array) {
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
        });
    });
    vm.runtime.on('SAY', (target, type, text) => {
        console.log(text);
    });
    vm.runtime.on('serverResponse', (content, mime, status, extraHeaders) => {
        event.content = [content, mime, status, extraHeaders];
    });
    vm.securityManager.getSandboxMode = () => Promise.resolve('unsandboxed');
    vm.securityManager.canAutomaticallyLoadExtension = () => Promise.resolve(true);
    vm.securityManager.canFetch = () => Promise.resolve(true);
    // we literally can't so no
    vm.securityManager.canOpenWindow = () => Promise.resolve(false);
    // we literally can't so no
    vm.securityManager.canRedirect = () => Promise.resolve(false);
    vm.securityManager.canLoadExtensionFromProject = () => Promise.resolve(true);
    vm.setCompatibilityMode(false);
    vm.setTurboMode(true);
    vm.clear();
    await vm.loadProject(buffer);
    vm.start();
    vm.greenFlag();
};

runProject(fs.readFileSync(file));
server.listen(port, () => {
    console.log(`LibreKitten on server has started at port ${port}.`);
});

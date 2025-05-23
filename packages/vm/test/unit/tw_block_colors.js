const {test} = require('tap');
const VirtualMachine = require('../../src/virtual-machine');
const BlockType = require('../../src/extension-support/block-type');

test('with explicit category colors', t => {
    const vm = new VirtualMachine();

    // lk: account for default core extensions
    const defaultLength = vm.runtime.getBlocksJSON().length;

    vm.extensionManager._registerInternalExtension({
        getInfo: () => ({
            id: 'testextension',
            name: 'test',
            color1: '#ff0000',
            color2: '#00ff00',
            color3: '#0000ff',
            blocks: [
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'defaults'
                },
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'color1',
                    color1: '#ffff00'
                },
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'color2',
                    color2: '#ff00ff'
                },
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'color3',
                    color3: '#00ffff'
                },
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'colorAll',
                    color1: '#7fff00',
                    color2: '#ff007f',
                    color3: '#007fff'
                }
            ]
        })
    });

    const blocks = vm.runtime.getBlocksJSON();

    t.equal(blocks[defaultLength].colour, '#ff0000');
    t.equal(blocks[defaultLength].colourSecondary, '#00ff00');
    t.equal(blocks[defaultLength].colourTertiary, '#0000ff');

    t.equal(blocks[defaultLength + 1].colour, '#ffff00');
    t.equal(blocks[defaultLength + 1].colourSecondary, '#00ff00');
    t.equal(blocks[defaultLength + 1].colourTertiary, '#0000ff');

    t.equal(blocks[defaultLength + 2].colour, '#ff0000');
    t.equal(blocks[defaultLength + 2].colourSecondary, '#ff00ff');
    t.equal(blocks[defaultLength + 2].colourTertiary, '#0000ff');

    t.equal(blocks[defaultLength + 3].colour, '#ff0000');
    t.equal(blocks[defaultLength + 3].colourSecondary, '#00ff00');
    t.equal(blocks[defaultLength + 3].colourTertiary, '#00ffff');

    t.equal(blocks[defaultLength + 4].colour, '#7fff00');
    t.equal(blocks[defaultLength + 4].colourSecondary, '#ff007f');
    t.equal(blocks[defaultLength + 4].colourTertiary, '#007fff');

    t.end();
});

test('with the default colors', t => {
    const vm = new VirtualMachine();

    // lk: account for default core extensions
    const defaultLength = vm.runtime.getBlocksJSON().length;

    vm.extensionManager._registerInternalExtension({
        getInfo: () => ({
            id: 'testextension',
            name: 'test',
            blocks: [
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'defaults'
                },
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'color1',
                    color1: '#ffff00'
                },
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'color2',
                    color2: '#ff00ff'
                },
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'color3',
                    color3: '#00ffff'
                },
                {
                    blockType: BlockType.COMMAND,
                    opcode: 'colorAll',
                    color1: '#7fff00',
                    color2: '#ff007f',
                    color3: '#007fff'
                }
            ]
        })
    });

    const blocks = vm.runtime.getBlocksJSON();

    t.equal(blocks[defaultLength].colour, '#0FBD8C');
    t.equal(blocks[defaultLength].colourSecondary, '#0DA57A');
    t.equal(blocks[defaultLength].colourTertiary, '#0B8E69');

    t.equal(blocks[defaultLength + 1].colour, '#ffff00');
    t.equal(blocks[defaultLength + 1].colourSecondary, '#0DA57A');
    t.equal(blocks[defaultLength + 1].colourTertiary, '#0B8E69');

    t.equal(blocks[defaultLength + 2].colour, '#0FBD8C');
    t.equal(blocks[defaultLength + 2].colourSecondary, '#ff00ff');
    t.equal(blocks[defaultLength + 2].colourTertiary, '#0B8E69');

    t.equal(blocks[defaultLength + 3].colour, '#0FBD8C');
    t.equal(blocks[defaultLength + 3].colourSecondary, '#0DA57A');
    t.equal(blocks[defaultLength + 3].colourTertiary, '#00ffff');

    t.equal(blocks[defaultLength + 4].colour, '#7fff00');
    t.equal(blocks[defaultLength + 4].colourSecondary, '#ff007f');
    t.equal(blocks[defaultLength + 4].colourTertiary, '#007fff');

    t.end();
});

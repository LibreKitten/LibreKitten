import {guiColors as baseGuiColors, blockColors as baseBlockColors} from './dark';
import {modernGuiColors} from './common/modern';

const guiColors = {
    ...baseGuiColors,
    ...modernGuiColors,

    'ui-white': '#161617',
    'ui-secondary': '#111112',
    'ui-tertiary': '#1b1b1d',

    'ui-modal-header-background': 'var(--menu-bar-background)',
    'ui-modal-header-foreground': 'var(--menu-bar-foreground)',

    'assets-background': '#111111',

    'menu-bar-background': 'rgba(40, 40, 42, 1)',
    'menu-bar-item-hover': 'var(--context-menu-item-hover-background)',
    'menu-bar-black-transparent': 'var(--ui-black-transparent)',

    'context-menu-item-hover-background': 'hsla(210, 100%, 60%, 0.35)',
    'context-menu-item-hover-danger': 'hsla(0, 65%, 50%, 0.45)'
};

const blockColors = {
    ...baseBlockColors,
    workspace: '#111112'
};

export {
    guiColors,
    blockColors
};

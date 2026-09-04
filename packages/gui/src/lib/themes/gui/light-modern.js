import {modernGuiColors} from './common/modern';

const guiColors = {
    ...modernGuiColors,

    'ui-primary': 'hsla(215, 45%, 96%, 1)',
    'ui-secondary': 'hsla(215, 45%, 94%, 1)',
    'ui-tertiary': 'hsla(215, 45%, 92%, 1)',

    'ui-modal-overlay': '#c1c1c1aa',
    'ui-modal-background': 'var(--ui-primary)',
    'ui-modal-background-secondary': 'var(--ui-tertiary)',
    'ui-modal-header-background': '#ffffff',
    'ui-modal-header-foreground': '#000000',
    'ui-modal-header-close-button-color': 'black',

    'menu-bar-background': 'rgba(255, 255, 255, 1)',
    'menu-bar-foreground': 'rgba(0, 0, 0, 1)',

    'context-menu-item-text': 'black',
    'context-menu-item-hover-background': 'hsla(210, 100%, 40%, 0.25)',
    'context-menu-item-hover-danger': 'hsla(0, 100%, 50%, 0.25)',

    'page-header-button-background': 'white',
    'page-header-button-foreground': 'var(--looks-secondary)',

    'footer-background': 'white',
    'footer-foreground': 'black',

    'icon-filter': 'invert(100%)'
};

const blockColors = {
    tooltipBackground: '#fff',
    tooltipBorder: '#e8e8e8',
    tooltipText: '#000'
};

export {
    guiColors,
    blockColors
};

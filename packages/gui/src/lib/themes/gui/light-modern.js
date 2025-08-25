import logo from '../../../lib/assets/librekitten-colour.svg';

const guiColors = {
    'ui-primary': 'hsla(215, 45%, 96%, 1)',
    'ui-secondary': 'hsla(215, 45%, 94%, 1)',
    'ui-tertiary': 'hsla(215, 45%, 92%, 1)',

    'menu-bar-background': 'rgba(255, 255, 255, 1)',
    'menu-bar-foreground': 'rgba(0, 0, 0, 1)',

    'menu-bar-item-hover': 'var(--context-menu-item-hover-background)',

    'context-menu-item-text': 'black',
    'context-menu-item-hover-background': 'hsla(210, 100%, 40%, 0.25)',
    'context-menu-item-hover-foreground': 'var(--context-menu-item-text)',

    'navbar-background': 'var(--menu-bar-background)',

    'icon-filter': 'invert(100%)',

    'logo-image': `url("${logo}")`
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

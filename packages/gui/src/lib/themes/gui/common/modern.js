import logo from '../../../../lib/assets/librekitten-colour.svg';

const modernGuiColors = {
    'menu-bar-item-hover': 'var(--context-menu-item-hover-background)',
    'menu-bar-primary-button-foreground': 'white',
    'menu-bar-primary-button-background': 'var(--looks-secondary)',

    'page-background': 'var(--ui-primary)',

    'page-header-background': 'var(--looks-secondary)',
    'page-header-foreground': 'white',
    'page-header-anchor-text': 'white',

    'page-header-button-background': 'white',
    'page-header-button-foreground': 'var(--looks-secondary)',

    'context-menu-item-hover-foreground': 'var(--context-menu-item-text)',

    'project-title-hover': 'var(--project-title-inactive)',
    'project-title-hover-border': 'var(--looks-secondary)',
    'project-title-focus-border': 'var(--looks-secondary)',
    'project-title-focus-shadow': 'var(--looks-transparent)',
    'project-title-focus-text': 'var(--menu-bar-foreground)',

    'logo-image': `url("${logo}")`
};

export {modernGuiColors};

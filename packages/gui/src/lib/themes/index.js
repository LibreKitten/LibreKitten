import defaultsDeep from 'lodash.defaultsdeep';
import {defineMessages} from 'react-intl';

import * as accentPurple from './accent/purple';
import * as accentBlue from './accent/blue';
import * as accentOrange from './accent/orange';
import * as accentRed from './accent/red';
import * as accentDarkBlue from './accent/dark-blue';

import * as guiLight from './gui/light';
import * as guiLightModern from './gui/light-modern';
import * as guiDark from './gui/dark';
import * as guiDarkModern from './gui/dark-modern';

import * as blocksThree from './blocks/three';
import * as blocksHighContrast from './blocks/high-contrast';
import * as blocksDark from './blocks/dark';

import lightModeIcon from './icons/tw-sun.svg';
import darkModeIcon from './icons/tw-moon.svg';

import threeIcon from './icons/tw-blocks-three.svg';
import highContrastIcon from './icons/tw-blocks-high-contrast.svg';
import customIcon from './icons/tw-blocks-custom.svg';

const ACCENT_PURPLE = 'purple';
const ACCENT_BLUE = 'blue';
const ACCENT_ORANGE = 'orange';
const ACCENT_RED = 'red';
const ACCENT_DARK_BLUE = 'dark-blue';
const ACCENT_MAP = {
    [ACCENT_PURPLE]: accentPurple,
    [ACCENT_BLUE]: accentBlue,
    [ACCENT_ORANGE]: accentOrange,
    [ACCENT_RED]: accentRed,
    [ACCENT_DARK_BLUE]: accentDarkBlue
};
const ACCENT_LABELS = defineMessages({
    [ACCENT_ORANGE]: {
        defaultMessage: 'LibreKitten — Orange',
        description: 'Name of LibreKitten\'s orange color scheme. Used by default.',
        id: 'lk.accent.orange'
    },
    [ACCENT_DARK_BLUE]: {
        defaultMessage: 'LibreKitten — Dark Blue',
        description: 'Name of LibreKitten\'s dark blue color scheme.',
        id: 'lk.accent.darkBlue'
    },
    [ACCENT_PURPLE]: {
        defaultMessage: 'Scratch — Purple',
        description: 'Name of Scratch\'s purple color scheme. Matches modern Scratch.',
        id: 'tw.accent.purple'
    },
    [ACCENT_BLUE]: {
        defaultMessage: 'Scratch — Blue',
        description: 'Name of Scratch\'s blue color scheme. Matches Scratch before the high contrast update.',
        id: 'tw.accent.blue'
    },
    [ACCENT_RED]: {
        defaultMessage: 'TurboWarp — Red',
        description: 'Name of TurboWarp\'s red color scheme.',
        id: 'lk.accent.red'
    }
});
const ACCENT_DEFAULT = ACCENT_ORANGE;

const GUI_LIGHT = 'light';
const GUI_LIGHT_MODERN = 'light-modern';
const GUI_DARK = 'dark';
const GUI_DARK_MODERN = 'dark-modern';
const GUI_MAP = {
    [GUI_LIGHT]: guiLight,
    [GUI_LIGHT_MODERN]: guiLightModern,
    [GUI_DARK]: guiDark,
    [GUI_DARK_MODERN]: guiDarkModern
};
const GUI_LABELS = defineMessages({
    [GUI_LIGHT_MODERN]: {
        defaultMessage: 'LibreKitten — Light (Modern)',
        description: 'Name of LibreKitten\'s "Light (Modern)" theme.',
        icon: lightModeIcon,
        id: 'lk.theme.lk-light-modern'
    },
    [GUI_DARK_MODERN]: {
        defaultMessage: 'LibreKitten — Dark (Modern)',
        description: 'Name of LibreKitten\'s "Dark (Modern)" theme.',
        icon: darkModeIcon,
        id: 'lk.theme.lk-dark-modern'
    },
    [GUI_LIGHT]: {
        defaultMessage: 'LibreKitten — Light (Colourful)',
        description: 'Name of LibreKitten\'s light theme.',
        icon: lightModeIcon,
        id: 'lk.theme.lk-light',
        menuDivider: true
    },
    [GUI_DARK]: {
        defaultMessage: 'LibreKitten — Dark (Colourful)',
        description: 'Name of LibreKitten\'s dark theme.',
        icon: darkModeIcon,
        id: 'lk.theme.lk-dark'
    }
});
const GUI_DEFAULT = GUI_LIGHT;

const BLOCKS_THREE = 'three';
const BLOCKS_HIGH_CONTRAST = 'high-contrast';
const BLOCKS_CUSTOM = 'custom';
const BLOCKS_DEFAULT = BLOCKS_THREE;
const defaultBlockColors = blocksThree.blockColors;
const BLOCKS_MAP = {
    [BLOCKS_THREE]: {
        light: {
            blocksMediaFolder: 'blocks-media/default',
            colors: blocksThree.blockColors,
            extensions: blocksThree.extensions,
            customExtensionColors: {},
            customBlockColors: blocksThree.customBlockColors,
            useForStage: true
        }
    },
    [BLOCKS_HIGH_CONTRAST]: {
        light: {
            blocksMediaFolder: 'blocks-media/high-contrast',
            colors: defaultsDeep({}, blocksHighContrast.blockColors, defaultBlockColors),
            extensions: blocksHighContrast.extensions,
            customExtensionColors: blocksHighContrast.customExtensionColors,
            customBlockColors: blocksHighContrast.customExtensionColors,
            useForStage: true
        },
        dark: {
            blocksMediaFolder: 'blocks-media/default',
            colors: defaultsDeep({}, blocksDark.blockColors, defaultBlockColors),
            extensions: blocksDark.extensions,
            customExtensionColors: blocksDark.customExtensionColors,
            customBlockColors: blocksDark.customExtensionColors,
            useForStage: false
        }
    },
    [BLOCKS_CUSTOM]: {
        // to be filled by editor-theme3 addon
        light: {
            blocksMediaFolder: 'blocks-media/default',
            colors: blocksThree.blockColors,
            extensions: {},
            customExtensionColors: {},
            useForStage: false
        }
    }
};
const BLOCKS_LABELS = defineMessages({
    [BLOCKS_HIGH_CONTRAST]: {
        defaultMessage: 'High Contrast',
        description: 'Name of the high contrast block colors.',
        icon: highContrastIcon,
        id: 'tw.blockColors.highContrast'
    },
    [BLOCKS_THREE]: {
        defaultMessage: 'Classic',
        description: 'Name of normal Scratch block colors.',
        icon: threeIcon,
        id: 'tw.blockColors.three'
    },
    [BLOCKS_CUSTOM]: {
        defaultMessage: 'Customize in Addon Settings',
        description: 'Link in block color list to open addon settings for more customization',
        icon: customIcon,
        id: 'tw.blockColors.custom'
    }
});

let themeObjectsCreated = 0;

class Theme {
    constructor (accent, gui, blocks) {
        // do not modify these directly
        /** @readonly */
        this.id = ++themeObjectsCreated;
        /** @readonly */
        this.accent = Object.prototype.hasOwnProperty.call(ACCENT_MAP, accent) ? accent : ACCENT_DEFAULT;
        /** @readonly */
        this.gui = Object.prototype.hasOwnProperty.call(GUI_MAP, gui) ? gui : GUI_DEFAULT;
        /** @readonly */
        this.blocks = Object.prototype.hasOwnProperty.call(BLOCKS_MAP, blocks) ? blocks : BLOCKS_DEFAULT;
    }

    static light = new Theme(ACCENT_DEFAULT, GUI_LIGHT_MODERN, BLOCKS_HIGH_CONTRAST);
    static dark = new Theme(ACCENT_DEFAULT, GUI_DARK_MODERN, BLOCKS_HIGH_CONTRAST);

    set (what, to) {
        if (what === 'accent') {
            return new Theme(to, this.gui, this.blocks);
        } else if (what === 'gui') {
            return new Theme(this.accent, to, this.blocks);
        } else if (what === 'blocks') {
            return new Theme(this.accent, this.gui, to);
        }
        throw new Error(`Unknown theme property: ${what}`);
    }

    getBlockObject () {
        const colorScheme = this.getGuiColors()['color-scheme'];
        if (!(colorScheme in BLOCKS_MAP[this.blocks])) {
            return BLOCKS_MAP[this.blocks].light;
        }

        return BLOCKS_MAP[this.blocks][colorScheme];
    }
    
    getBlocksMediaFolder () {
        return this.getBlockObject().blocksMediaFolder;
    }

    getGuiColors () {
        return defaultsDeep(
            {},
            ACCENT_MAP[this.accent].guiColors,
            GUI_MAP[this.gui].guiColors,
            guiLight.guiColors
        );
    }

    getBlockColors () {
        return defaultsDeep(
            {},
            ACCENT_MAP[this.accent].blockColors,
            GUI_MAP[this.gui].blockColors,
            this.getBlockObject().colors
        );
    }

    getExtensions () {
        return this.getBlockObject().extensions;
    }

    isDark () {
        const theme = this.getGuiColors()['color-scheme'];
        return theme === 'dark' || theme === 'dark-modern';
    }

    getStageBlockColors () {
        if (
            this.getBlockObject().useForStage
        ) {
            return this.getBlockColors();
        }
        return Theme.light.getBlockColors();
    }

    getCustomExtensionColors () {
        return this.getBlockObject().customExtensionColors;
    }

    getCustomBlockColors () {
        return this.getBlockObject().customBlockColors;
    }
}

export {
    Theme,
    defaultBlockColors,

    ACCENT_ORANGE,
    ACCENT_PURPLE,
    ACCENT_BLUE,
    ACCENT_DARK_BLUE,
    ACCENT_RED,
    ACCENT_MAP,
    ACCENT_LABELS,

    GUI_LIGHT,
    GUI_LIGHT_MODERN,
    GUI_DARK,
    GUI_DARK_MODERN,
    GUI_MAP,
    GUI_LABELS,

    BLOCKS_THREE,
    BLOCKS_HIGH_CONTRAST,
    BLOCKS_CUSTOM,
    BLOCKS_MAP,
    BLOCKS_LABELS
};

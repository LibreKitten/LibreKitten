import musicIcon from './high-contrast-media/extensions/musicIcon.svg';
import penIcon from './high-contrast-media/extensions/penIcon.svg';
import text2speechIcon from './high-contrast-media/extensions/text2speechIcon.svg';
import translateIcon from './high-contrast-media/extensions/translateIcon.svg';
import videoSensingIcon from './high-contrast-media/extensions/videoSensingIcon.svg';
import {hex2hsv, hsv2hex} from '../../tw-color-utils';

const blockColors = {
    motion: {
        primary: '#80B5FF',
        secondary: '#B3D2FF',
        tertiary: '#3373CC',
        quaternary: '#CCE1FF'
    },
    looks: {
        primary: '#CCB3FF',
        secondary: '#DDCCFF',
        tertiary: '#774DCB',
        quaternary: '#EEE5FF'
    },
    sounds: {
        primary: '#E19DE1',
        secondary: '#FFB3FF',
        tertiary: '#BD42BD',
        quaternary: '#FFCCFF'

    },
    control: {
        primary: '#FFBE4C',
        secondary: '#FFDA99',
        tertiary: '#CF8B17',
        quaternary: '#FFE3B3'
    },
    event: {
        primary: '#FFD966',
        secondary: '#FFECB3',
        tertiary: '#CC9900',
        quaternary: '#FFF2CC'
    },
    sensing: {
        primary: '#85C4E0',
        secondary: '#AED8EA',
        tertiary: '#2E8EB8',
        quaternary: '#C2E2F0'
    },
    pen: {
        primary: '#13ECAF',
        secondary: '#75F0CD',
        tertiary: '#0B8E69',
        quaternary: '#A3F5DE'
    },
    operators: {
        primary: '#7ECE7E',
        secondary: '#B5E3B5',
        tertiary: '#389438',
        quaternary: '#DAF1DA'
    },
    data: {
        primary: '#FFA54C',
        secondary: '#FFCC99',
        tertiary: '#DB6E00',
        quaternary: '#FFE5CC'
    },
    // This is not a new category, but rather for differentiation
    // between lists and scalar variables.
    data_lists: {
        primary: '#FF9966',
        secondary: '#FFCAB0', // I don't think this is used, b/c we don't have any droppable fields in list blocks
        tertiary: '#E64D00',
        quaternary: '#FFDDCC'
    },
    more: {
        primary: '#FF99AA',
        secondary: '#FFCCD5',
        tertiary: '#FF3355',
        quaternary: '#FFE5EA'
    },
    addons: {
        primary: '#34e4d0',
        secondary: '#71e2d5',
        tertiary: '#29b2a2',
        quaternary: '#9ee2db'
    },
    text: '#000000',
    textField: '#FFFFFF',
    textFieldText: '#000000', // Text inside of inputs e.g. 90 in [point in direction (90)]
    toolboxText: '#000000', // Toolbox text, color picker text (used to be #575E75)
    blackText: '#000000',
    // The color that the category menu label (e.g. 'motion', 'looks', etc.) changes to on hover
    toolboxHover: '#3373CC',
    insertionMarker: '#000000',
    insertionMarkerOpacity: 0.2,
    dragShadowOpacity: 0.6,
    stackGlow: '#FFF200',
    stackGlowSize: 4,
    stackGlowOpacity: 1,
    replacementGlow: '#FFFFFF',
    replacementGlowSize: 2,
    replacementGlowOpacity: 1,
    colourPickerStroke: '#FFFFFF',
    fieldShadow: 'rgba(255, 255, 255, 0.3)',
    dragShadowOpacity: 0.6,
    menuHover: 'rgba(255, 255, 255, 0.3)',
    fieldShadow: 'rgba(255, 255, 255, 0.3)',
    dropDownShadow: 'rgba(0, 0, 0, .3)',
    numPadBackground: '#547AB2',
    numPadBorder: '#435F91',
    numPadActiveBackground: '#435F91',
    numPadText: 'white', // Do not use hex here, it cannot be inlined with data-uri SVG
    valueReportBackground: '#FFFFFF',
    valueReportBorder: '#AAAAAA',
    valueReportForeground: '#000000',
    menuHover: 'rgba(0, 0, 0, 0.2)',
    contextMenuBackground: '#ffffff',
    contextMenuBorder: '#cccccc',
    contextMenuForeground: '#000000',
    contextMenuActiveBackground: '#d6e9f8',
    contextMenuDisabledForeground: '#cccccc',
    flyoutLabelColor: '#575E75',
    checkboxInactiveBackground: '#ffffff',
    checkboxInactiveBorder: '#c8c8c8',
    checkboxActiveBackground: '#4C97FF',
    checkboxActiveBorder: '#3373CC',
    checkboxCheck: '#ffffff',
    buttonBorder: '#c6c6c6',
    buttonActiveBackground: '#ffffff',
    buttonForeground: '#575E75',
    zoomIconFilter: 'none',
    gridColor: '#dddddd'
};

const extensions = {
    music: {
        blockIconURI: musicIcon
    },
    pen: {
        blockIconURI: penIcon
    },
    text2speech: {
        blockIconURI: text2speechIcon
    },
    translate: {
        blockIconURI: translateIcon
    },
    videoSensing: {
        blockIconURI: videoSensingIcon
    }
};

const clamp = (value, lower, upper) => Math.max(lower, Math.min(upper, value));

const customExtensionColors = {
    primary: primary => {
        const hsv = hex2hsv(primary);
        hsv[1] = clamp(hsv[1] - 20, 0, 50);
        hsv[2] = clamp(hsv[2] + 20, 80, 100);
        return hsv2hex(hsv);
    },
    secondary: primary => {
        const hsv = hex2hsv(primary);
        hsv[1] = clamp(hsv[1] - 40, 0, 50);
        hsv[2] = clamp(hsv[2] + 20, 80, 100);
        return hsv2hex(hsv);
    },
    tertiary: primary => {
        const hsv = hex2hsv(primary);
        hsv[2] = clamp(hsv[2] - 20, 0, 100);
        return hsv2hex(hsv);
    },
    quaternary: primary => {
        const hsv = hex2hsv(primary);
        hsv[1] = clamp(hsv[1] - 60, 0, 100);
        hsv[2] = clamp(hsv[2] + 20, 90, 100);
        return hsv2hex(hsv);
    },
    categoryIconBackground: primary => customExtensionColors.primary(primary),
    categoryIconBorder: primary => customExtensionColors.tertiary(primary)
};

export {
    blockColors,
    extensions,
    customExtensionColors
};

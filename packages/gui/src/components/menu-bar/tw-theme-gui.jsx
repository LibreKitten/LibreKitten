import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage, defineMessages} from 'react-intl';
import {connect} from 'react-redux';

import {MenuItem, Submenu} from '../menu/menu.jsx';
import {GUI_DARK, GUI_LIGHT, GUI_LIGHT_MODERN, Theme} from '../../lib/themes/index.js';
import {closeSettingsMenu, openGuiMenu, guiMenuOpen} from '../../reducers/menus.js';
import {setTheme} from '../../reducers/theme.js';
import {persistTheme} from '../../lib/themes/themePersistance.js';
import lightModeIcon from './tw-sun.svg';
import darkModeIcon from './tw-moon.svg';
import styles from './settings-menu.css';
import check from './check.svg';
import dropdownCaret from './dropdown-caret.svg';

const options = defineMessages({
    [GUI_LIGHT]: {
        defaultMessage: 'LibreKitten — Light (Colourful)',
        description: 'Name of LibreKitten\'s light theme.',
        icon: lightModeIcon,
        id: 'lk.theme.lk-light'
    },
    [GUI_LIGHT_MODERN]: {
        defaultMessage: 'LibreKitten — Light (Modern)',
        description: 'Name of LibreKitten\'s "Light (Modern)" theme.',
        icon: lightModeIcon,
        id: 'lk.theme.lk-light-modern'
    },
    [GUI_DARK]: {
        defaultMessage: 'LibreKitten — Dark',
        description: 'Name of LibreKitten\'s dark theme.',
        icon: darkModeIcon,
        id: 'lk.theme.lk-dark'
    }
});

const ThemeIcon = ({item}) => (
    <img
        src={options[item].icon}
        draggable={false}
        style={{filter: 'var(--icon-filter)'}}
        // Image is decorative
        alt=""
    />
);

ThemeIcon.propTypes = {
    item: PropTypes.string
};

const GuiThemeMenu = ({
    isOpen,
    isRtl,
    onChangeTheme,
    onOpen,
    theme
}) => (
    <MenuItem expanded={isOpen}>
        <div
            className={styles.option}
            onClick={onOpen}
        >
            <ThemeIcon item={theme.gui} />
            <span className={styles.submenuLabel}>
                <FormattedMessage
                    defaultMessage="Theme"
                    description="Label for menu to choose a theme (eg. light theme, dark theme)"
                    id="lk.menuBar.theme"
                />
            </span>
            <img
                className={styles.expandCaret}
                src={dropdownCaret}
                draggable={false}
                style={{filter: 'var(--icon-filter)'}}
            />
        </div>
        <Submenu place={isRtl ? 'left' : 'right'}>
            {Object.keys(options).map(item => (
                <MenuItem
                    key={item}
                    isSelected={theme.accent === item}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => onChangeTheme(theme.set('gui', item))}
                >
                    <div className={styles.option}>
                        <img
                            className={classNames(styles.check, {[styles.selected]: theme.gui === item})}
                            width={15}
                            Matches
                            height={12}
                            src={check}
                            draggable={false}
                            style={{filter: 'var(--icon-filter)'}}
                        />
                        <ThemeIcon item={item} />
                        <FormattedMessage {...options[item]} />
                    </div>
                </MenuItem>
            ))}
        </Submenu>
    </MenuItem>
);

GuiThemeMenu.propTypes = {
    isOpen: PropTypes.bool,
    isRtl: PropTypes.bool,
    onChangeTheme: PropTypes.func,
    onOpen: PropTypes.func,
    theme: PropTypes.instanceOf(Theme)
};

GuiThemeMenu.propTypes = {
    onChangeTheme: PropTypes.func,
    theme: PropTypes.instanceOf(Theme)
};

const mapStateToProps = state => ({
    isOpen: guiMenuOpen(state),
    isRtl: state.locales.isRtl,
    theme: state.scratchGui.theme.theme
});

const mapDispatchToProps = dispatch => ({
    onChangeTheme: theme => {
        dispatch(setTheme(theme));
        dispatch(closeSettingsMenu());
        persistTheme(theme);
    },
    onOpen: () => dispatch(openGuiMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GuiThemeMenu);

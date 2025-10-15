import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

import {MenuItem, Submenu} from '../menu/menu.jsx';
import {GUI_LABELS, Theme} from '../../lib/themes/index.js';
import {closeSettingsMenu, openGuiMenu, guiMenuOpen} from '../../reducers/menus.js';
import {setTheme} from '../../reducers/theme.js';
import {persistTheme} from '../../lib/themes/themePersistance.js';
import styles from './settings-menu.css';
import check from './check.svg';
import dropdownCaret from './dropdown-caret.svg';


const ThemeIcon = ({item}) => (
    <img
        src={GUI_LABELS[item].icon}
        draggable={false}
        className={styles.iconFilter}
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
                className={classNames(styles.expandCaret, styles.iconFilter)}
                src={dropdownCaret}
                draggable={false}
            />
        </div>
        <Submenu place={isRtl ? 'left' : 'right'}>
            {Object.keys(GUI_LABELS).map(item => (
                <MenuItem
                    key={item}
                    isSelected={theme.accent === item}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => onChangeTheme(theme.set('gui', item))}
                >
                    <div className={styles.option}>
                        <img
                            className={classNames(
                                styles.check,
                                styles.iconFilter,
                                {[styles.selected]: theme.gui === item}
                            )}
                            width={15}
                            Matches
                            height={12}
                            src={check}
                            draggable={false}
                        />
                        <ThemeIcon item={item} />
                        <FormattedMessage {...GUI_LABELS[item]} />
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

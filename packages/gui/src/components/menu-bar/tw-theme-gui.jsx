import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {Menubar} from 'radix-ui';

import {MenuRadioItem, Submenu} from '../menu/menu.jsx';
import {GUI_LABELS, Theme} from '../../lib/themes/index.js';
import {closeSettingsMenu, openGuiMenu, guiMenuOpen} from '../../reducers/menus.js';
import {setTheme} from '../../reducers/theme.js';
import {persistTheme} from '../../lib/themes/themePersistance.js';
import styles from './settings-menu.css';
import menuStyles from '../menu/menu.css';
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
    isRtl,
    onChangeTheme,
    theme
}) => (
    <Menubar.Sub>
        <Menubar.SubTrigger
            className={classNames(
                menuStyles.menuItem,
                menuStyles.hoverable,
                styles.option
            )}
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
        </Menubar.SubTrigger>
        <Menubar.Portal>
            <Submenu place={isRtl ? 'left' : 'right'}>
                <Menubar.RadioGroup
                    value={theme.gui}
                    // eslint-disable-next-line react/jsx-no-bind
                    onValueChange={value => onChangeTheme(theme.set('gui', value))}
                >
                    {Object.keys(GUI_LABELS).map(item => {
                        const label = GUI_LABELS[item];
                        return (<>
                            {label.menuDivider && <Menubar.Separator />}
                            <MenuRadioItem
                                className={classNames(
                                    styles.option,
                                    styles.inset,
                                    {[menuStyles.menuSection]: label.menuDivider}
                                )}
                                key={item}
                                value={item}
                            >
                                <Menubar.ItemIndicator className={styles.checkArea}>
                                    <img
                                        className={classNames(styles.check, styles.iconFilter)}
                                        width={15}
                                        Matches
                                        height={12}
                                        src={check}
                                        draggable={false}
                                    />
                                </Menubar.ItemIndicator>
                                <ThemeIcon item={item} />
                                <FormattedMessage {...label} />
                            </MenuRadioItem>
                        </>);
                    })}
                </Menubar.RadioGroup>
            </Submenu>
        </Menubar.Portal>
    </Menubar.Sub>
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

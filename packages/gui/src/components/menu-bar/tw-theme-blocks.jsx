import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {Menubar} from 'radix-ui';

import check from './check.svg';
import dropdownCaret from './dropdown-caret.svg';
import {MenuRadioItem, Submenu} from '../menu/menu.jsx';
import {BLOCKS_CUSTOM, BLOCKS_LABELS, Theme} from '../../lib/themes/index.js';
import {openBlocksThemeMenu, blocksThemeMenuOpen, closeSettingsMenu} from '../../reducers/menus.js';
import {setTheme} from '../../reducers/theme.js';
import {persistTheme} from '../../lib/themes/themePersistance.js';
import styles from './settings-menu.css';
import menuStyles from '../menu/menu.css';
import openLinkIcon from './tw-open-link.svg';

const ThemeIcon = ({id, invert = false}) => (
    <img
        className={invert ? styles.iconFilter : ''}
        src={BLOCKS_LABELS[id].icon}
        draggable={false}
        width={24}
    />
);

ThemeIcon.propTypes = {
    id: PropTypes.string,
    invert: PropTypes.bool
};

const ThemeMenuItem = ({id, disabled}) => (
    <MenuRadioItem
        className={classNames(styles.option, styles.inset, {[styles.disabled]: disabled})}
        disabled={disabled}
        value={id}
    >
        <Menubar.ItemIndicator className={styles.checkArea}>
            <img
                width={15}
                height={12}
                className={classNames(styles.check, styles.iconFilter)}
                src={check}
                draggable={false}
            />
        </Menubar.ItemIndicator>
        <ThemeIcon
            id={id}
            invert={id === BLOCKS_CUSTOM}
        />
        <FormattedMessage {...BLOCKS_LABELS[id]} />
        {id === BLOCKS_CUSTOM && (
            <img
                width={20}
                height={20}
                className={classNames(styles.openLink, styles.iconFilter)}
                src={openLinkIcon}
                draggable={false}
            />
        )}
    </MenuRadioItem>
);

ThemeMenuItem.propTypes = {
    id: PropTypes.string,
    disabled: PropTypes.bool
};

const BlocksThemeMenu = ({
    isRtl,
    onChangeTheme,
    onOpenCustomSettings,
    theme
}) => {
    const labels = Object.keys(BLOCKS_LABELS);
    if (!onOpenCustomSettings) delete labels[BLOCKS_CUSTOM];

    return (
        <Menubar.Sub>
            <Menubar.SubTrigger
                className={classNames(
                    menuStyles.menuItem,
                    menuStyles.hoverable,
                    styles.option
                )}
            >
                <ThemeIcon
                    id={theme.blocks}
                    invert={theme.blocks === BLOCKS_CUSTOM}
                />
                <span className={styles.submenuLabel}>
                    <FormattedMessage
                        defaultMessage="Block Colors"
                        description="Label for to choose what color blocks should be, eg. original or high contrast"
                        id="tw.menuBar.blockColors"
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
                        value={theme.blocks}
                        // eslint-disable-next-line react/jsx-no-bind
                        onValueChange={
                            value => (value === BLOCKS_CUSTOM ?
                                onOpenCustomSettings() :
                                onChangeTheme(theme.set('blocks', value)))
                        }
                    >
                        {Object.keys(BLOCKS_LABELS).map(i => (
                            <ThemeMenuItem
                                key={i}
                                id={i}
                                disabled={i !== BLOCKS_CUSTOM && theme.blocks === BLOCKS_CUSTOM}
                            />
                        ))}
                    </Menubar.RadioGroup>
                </Submenu>
            </Menubar.Portal>
        </Menubar.Sub>
    );
};

BlocksThemeMenu.propTypes = {
    isRtl: PropTypes.bool,
    onChangeTheme: PropTypes.func,
    onOpenCustomSettings: PropTypes.func,
    theme: PropTypes.instanceOf(Theme)
};

const mapStateToProps = state => ({
    isOpen: blocksThemeMenuOpen(state),
    isRtl: state.locales.isRtl,
    theme: state.scratchGui.theme.theme
});

const mapDispatchToProps = dispatch => ({
    onChangeTheme: theme => {
        dispatch(setTheme(theme));
        dispatch(closeSettingsMenu());
        persistTheme(theme);
    },
    onOpenMenu: () => dispatch(openBlocksThemeMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlocksThemeMenu);

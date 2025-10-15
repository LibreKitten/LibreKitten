import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';

import check from './check.svg';
import dropdownCaret from './dropdown-caret.svg';
import {MenuItem, Submenu} from '../menu/menu.jsx';
import {BLOCKS_CUSTOM, BLOCKS_LABELS, Theme} from '../../lib/themes/index.js';
import {openBlocksThemeMenu, blocksThemeMenuOpen, closeSettingsMenu} from '../../reducers/menus.js';
import {setTheme} from '../../reducers/theme.js';
import {persistTheme} from '../../lib/themes/themePersistance.js';
import styles from './settings-menu.css';
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

const ThemeMenuItem = ({id, disabled, isSelected, onClick}) => (
    <MenuItem onClick={disabled ? null : onClick}>
        <div className={classNames(styles.option, {[styles.disabled]: disabled})}>
            <img
                width={15}
                height={12}
                className={classNames(styles.check, styles.iconFilter, {[styles.selected]: isSelected})}
                src={check}
                draggable={false}
            />
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
        </div>
    </MenuItem>
);

ThemeMenuItem.propTypes = {
    id: PropTypes.string,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
};

const BlocksThemeMenu = ({
    isOpen,
    isRtl,
    onChangeTheme,
    onOpenCustomSettings,
    onOpenMenu,
    theme
}) => {
    const labels = Object.keys(BLOCKS_LABELS);
    if (!onOpenCustomSettings) delete labels[BLOCKS_CUSTOM];

    return (
        <MenuItem expanded={isOpen}>
            <div
                className={styles.option}
                onClick={onOpenMenu}
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
            </div>
            <Submenu place={isRtl ? 'left' : 'right'}>
                {Object.keys(BLOCKS_LABELS).map(i => (
                    <ThemeMenuItem
                        key={i}
                        id={i}
                        isSelected={theme.blocks === i}
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={
                            i === BLOCKS_CUSTOM ?
                                onOpenCustomSettings :
                                () => onChangeTheme(theme.set('blocks', i))
                        }
                        disabled={i !== BLOCKS_CUSTOM && theme.blocks === BLOCKS_CUSTOM}
                    />
                ))}
            </Submenu>
        </MenuItem>
    );
};

BlocksThemeMenu.propTypes = {
    isOpen: PropTypes.bool,
    isRtl: PropTypes.bool,
    onChangeTheme: PropTypes.func,
    onOpenCustomSettings: PropTypes.func,
    onOpenMenu: PropTypes.func,
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

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {Menubar} from 'radix-ui';

import check from './check.svg';
import dropdownCaret from './dropdown-caret.svg';
import {MenuRadioItem, Submenu} from '../menu/menu.jsx';
import {ACCENT_LABELS, ACCENT_MAP, Theme} from '../../lib/themes/index.js';
import {openAccentMenu, accentMenuOpen, closeSettingsMenu} from '../../reducers/menus.js';
import {setTheme} from '../../reducers/theme.js';
import {persistTheme} from '../../lib/themes/themePersistance.js';
import styles from './settings-menu.css';
import menuStyles from '../menu/menu.css';

const ColorIcon = props => (
    'icon' in ACCENT_LABELS[props.id] ? (
        <img
            className={styles.accentIconOuter}
            src={ACCENT_LABELS[props.id].icon}
            draggable={false}
            // Image is decorative
            alt=""
        />
    ) : (
        <div
            className={styles.accentIconOuter}
            style={{
                // menu-bar-background is var(...), don't want to evaluate with the current values
                backgroundColor: ACCENT_MAP[props.id].guiColors['looks-secondary'],
                backgroundImage: ACCENT_MAP[props.id].guiColors['menu-bar-background-image']
            }}
        />
    )
);

ColorIcon.propTypes = {
    id: PropTypes.string
};

const AccentMenuItem = props => (
    <MenuRadioItem
        className={classNames(styles.option, styles.inset)}
        value={props.id}
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
        <ColorIcon id={props.id} />
        <FormattedMessage {...ACCENT_LABELS[props.id]} />
    </MenuRadioItem>
);

AccentMenuItem.propTypes = {
    id: PropTypes.string
};

const AccentThemeMenu = ({
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
            <ColorIcon id={theme.accent} />
            <span className={styles.submenuLabel}>
                <FormattedMessage
                    defaultMessage="Accent"
                    description="Label for menu to choose accent color (eg. TurboWarp's red, Scratch's purple)"
                    id="tw.menuBar.accent"
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
                    value={theme.accent}
                    // eslint-disable-next-line react/jsx-no-bind
                    onValueChange={item => onChangeTheme(theme.set('accent', item))}
                >
                    {Object.keys(ACCENT_LABELS).map(item => (
                        <AccentMenuItem
                            key={item}
                            id={item}
                        />
                    ))}
                </Menubar.RadioGroup>
            </Submenu>
        </Menubar.Portal>
    </Menubar.Sub>
);

AccentThemeMenu.propTypes = {
    isRtl: PropTypes.bool,
    onChangeTheme: PropTypes.func,
    theme: PropTypes.instanceOf(Theme)
};

const mapStateToProps = state => ({
    isOpen: accentMenuOpen(state),
    isRtl: state.locales.isRtl,
    theme: state.scratchGui.theme.theme
});

const mapDispatchToProps = dispatch => ({
    onChangeTheme: theme => {
        dispatch(setTheme(theme));
        dispatch(closeSettingsMenu());
        persistTheme(theme);
    },
    onOpen: () => dispatch(openAccentMenu())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccentThemeMenu);

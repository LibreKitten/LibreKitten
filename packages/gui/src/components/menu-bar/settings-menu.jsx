import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import LanguageMenu from './language-menu.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
import {MenuItem, MenuSection} from '../menu/menu.jsx';
import MenuLabel from './tw-menu-label.jsx';
import TWAccentThemeMenu from './tw-theme-accent.jsx';
import TWGuiThemeMenu from './tw-theme-gui.jsx';
import TWBlocksThemeMenu from './tw-theme-blocks.jsx';
import TWDesktopSettings from './tw-desktop-settings.jsx';

import menuBarStyles from './menu-bar.css';
import styles from './settings-menu.css';

import addonsIcon from './addons.svg';
import dropdownCaret from './dropdown-caret.svg';
import settingsIcon from './icon--settings.svg';
import openLinkIcon from './tw-open-link.svg';

const AddonMenuItem = ({className, onClick}) => (
    <MenuItem className={className}>
        <div
            className={styles.option}
            onClick={onClick}
        >
            <img
                src={addonsIcon}
                draggable={false}
                width={20}
                height={20}
                className={styles.icon}
            />
            <span className={styles.submenuLabel}>
                <FormattedMessage
                    defaultMessage="Addons"
                    description="Button to open addon settings"
                    id="tw.menuBar.addons"
                />
            </span>
            <img
                width={20}
                height={20}
                className={classNames(styles.openLink, styles.iconFilter)}
                src={openLinkIcon}
                draggable={false}
            />
        </div>
    </MenuItem>
);

AddonMenuItem.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

const WelcomeModalMenuItem = ({className, onClick}) => (
    <MenuItem className={className}>
        <div
            className={styles.option}
            onClick={onClick}
        >
            <span className={styles.submenuLabel}>
                <FormattedMessage
                    defaultMessage="Show welcome screen"
                    description="Button to re-show the welcome modal"
                    id="lk.menuBar.welcomeModal"
                />
            </span>
        </div>
    </MenuItem>
);

WelcomeModalMenuItem.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

const SettingsMenu = ({
    canChangeLanguage,
    canChangeTheme,
    isRtl,
    onClickAddonSettings,
    onClickDesktopSettings,
    onClickWelcomeModal,
    onOpenCustomSettings,
    onRequestClose,
    onRequestOpen,
    settingsMenuOpen
}) => (
    <MenuLabel
        open={settingsMenuOpen}
        onOpen={onRequestOpen}
        onClose={onRequestClose}
    >
        <img
            src={settingsIcon}
            draggable={false}
            width={20}
            height={20}
            className={styles.iconFilter}
        />
        <span className={styles.dropdownLabel}>
            <FormattedMessage
                defaultMessage="Settings"
                description="Settings menu"
                id="gui.menuBar.settings"
            />
        </span>
        <img
            src={dropdownCaret}
            draggable={false}
            width={8}
            height={5}
            className={styles.iconFilter}
        />
        <MenuBarMenu
            className={menuBarStyles.menuBarMenu}
            open={settingsMenuOpen}
            place={isRtl ? 'left' : 'right'}
        >
            <MenuSection>
                {canChangeLanguage && <LanguageMenu onRequestCloseSettings={onRequestClose} />}
                {canChangeTheme && (
                    <React.Fragment>
                        <TWGuiThemeMenu />
                        <TWBlocksThemeMenu
                            onOpenCustomSettings={onOpenCustomSettings}
                        />
                        <TWAccentThemeMenu />
                    </React.Fragment>
                )}
                {onClickDesktopSettings && <TWDesktopSettings onClick={onClickDesktopSettings} />}
            </MenuSection>
            <MenuSection>
                {onClickAddonSettings && <AddonMenuItem onClick={onClickAddonSettings} />}
            </MenuSection>
            <MenuSection>
                {onClickWelcomeModal && <WelcomeModalMenuItem onClick={onClickWelcomeModal} />}
            </MenuSection>
        </MenuBarMenu>
    </MenuLabel>
);

SettingsMenu.propTypes = {
    canChangeLanguage: PropTypes.bool,
    canChangeTheme: PropTypes.bool,
    isRtl: PropTypes.bool,
    onClickAddonSettings: PropTypes.func,
    onClickDesktopSettings: PropTypes.func,
    onClickWelcomeModal: PropTypes.func,
    onOpenCustomSettings: PropTypes.func,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
    settingsMenuOpen: PropTypes.bool
};

export default SettingsMenu;

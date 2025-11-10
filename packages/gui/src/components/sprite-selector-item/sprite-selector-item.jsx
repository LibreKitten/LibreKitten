import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import DeleteButton from '../delete-button/delete-button.jsx';
import styles from './sprite-selector-item.css';
import {ContextMenu} from 'radix-ui';
import {DangerousMenuItem, StyledContextMenu, StyledMenuItem} from '../context-menu/context-menu.jsx';
import {FormattedMessage} from 'react-intl';

// react-contextmenu requires unique id to match trigger and context menu
let contextMenuId = 0;

const SpriteSelectorItem = props => (
    <ContextMenu.Root>
        <ContextMenu.Trigger
            className={classNames(props.className, styles.spriteSelectorItem, {
                [styles.isSelected]: props.selected
            })}
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onMouseDown}
            disabled={props.preventContextMenu}
            id={`${props.name}-${contextMenuId}`}
            ref={props.componentRef}
        >
            {typeof props.number === 'undefined' ? null : (
                <div className={styles.number}>{props.number}</div>
            )}
            {props.costumeURL ? (
                <div className={styles.spriteImageOuter}>
                    <div className={styles.spriteImageInner}>
                        <img
                            className={styles.spriteImage}
                            draggable={false}
                            loading="lazy"
                            src={props.costumeURL}
                        />
                    </div>
                </div>
            ) : null}
            <div className={styles.spriteInfo}>
                <div className={styles.spriteName}>{props.name}</div>
                {props.details ? (
                    <div className={styles.spriteDetails}>{props.details}</div>
                ) : null}
            </div>
            {(props.selected && props.onDeleteButtonClick) ? (
                <DeleteButton
                    className={styles.deleteButton}
                    onClick={props.onDeleteButtonClick}
                />
            ) : null}
            {props.onDuplicateButtonClick || props.onDeleteButtonClick || props.onExportButtonClick ? (
                <ContextMenu.Portal>
                    <StyledContextMenu id={`${props.name}-${contextMenuId++}`}>
                        {props.onDuplicateButtonClick ? (
                            <StyledMenuItem onClick={props.onDuplicateButtonClick}>
                                <FormattedMessage
                                    defaultMessage="duplicate"
                                    description="Menu item to duplicate in the right click menu"
                                    id="gui.spriteSelectorItem.contextMenuDuplicate"
                                />
                            </StyledMenuItem>
                        ) : null}
                        {props.onExportButtonClick ? (
                            <StyledMenuItem onClick={props.onExportButtonClick}>
                                <FormattedMessage
                                    defaultMessage="export"
                                    description="Menu item to export the selected item"
                                    id="gui.spriteSelectorItem.contextMenuExport"
                                />
                            </StyledMenuItem>
                        ) : null}
                        {props.onRenameButtonClick ? (
                            <StyledMenuItem onClick={props.onRenameButtonClick}>
                                <FormattedMessage
                                    defaultMessage="rename"
                                    description="Menu item to rename an item"
                                    id="tw.spriteSelectorItem.rename"
                                />
                            </StyledMenuItem>
                        ) : null}
                        {props.onDeleteButtonClick ? (
                            <DangerousMenuItem onClick={props.onDeleteButtonClick}>
                                <FormattedMessage
                                    defaultMessage="delete"
                                    description="Menu item to delete in the right click menu"
                                    id="gui.spriteSelectorItem.contextMenuDelete"
                                />
                            </DangerousMenuItem>
                        ) : null}
                    </StyledContextMenu>
                </ContextMenu.Portal>
            ) : null}
        </ContextMenu.Trigger>
    </ContextMenu.Root>
);

SpriteSelectorItem.propTypes = {
    className: PropTypes.string,
    componentRef: PropTypes.func,
    costumeURL: PropTypes.string,
    details: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    name: PropTypes.any,
    number: PropTypes.number,
    onClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    onDuplicateButtonClick: PropTypes.func,
    onExportButtonClick: PropTypes.func,
    onRenameButtonClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    preventContextMenu: PropTypes.bool,
    selected: PropTypes.bool.isRequired
};

export default SpriteSelectorItem;

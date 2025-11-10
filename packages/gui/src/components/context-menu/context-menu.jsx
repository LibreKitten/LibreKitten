import React from 'react';
import {ContextMenu} from 'radix-ui';
import classNames from 'classnames';

import styles from './context-menu.css';

const StyledContextMenu = props => (
    <ContextMenu.Content
        {...props}
        className={styles.contextMenu}
    />
);

const StyledMenuItem = props => (
    <ContextMenu.Item
        {...props}
        className={styles.menuItem}
    />
);

const BorderedMenuItem = props => (
    <>
        <ContextMenu.Separator />
        <ContextMenu.Item
            {...props}
            className={classNames(styles.menuItem, styles.menuItemBordered)}
        />
    </>
);

const DangerousMenuItem = props => (
    <>
        <ContextMenu.Separator />
        <ContextMenu.Item
            {...props}
            className={classNames(styles.menuItem, styles.menuItemBordered, styles.menuItemDanger)}
        />
    </>
);


export {
    BorderedMenuItem,
    DangerousMenuItem,
    StyledContextMenu,
    StyledMenuItem
};

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {Menubar} from 'radix-ui';

import styles from './menu.css';

const DividerContext = React.createContext(false);

const MenuComponent = ({
    className = '',
    children,
    place = 'right',
    ...props
}) => (
    <Menubar.Content
        className={classNames(styles.menu, className)}
        place={place === 'right' ? 'start' : 'end'}
        {...props}
    >
        {children}
    </Menubar.Content>
);

MenuComponent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    place: PropTypes.oneOf(['left', 'right'])
};


const Submenu = ({children, className, place, ...props}) => (
    <Menubar.SubContent
        className={classNames(
            styles.menu,
            styles.submenu,
            className,
            {
                [styles.left]: place === 'left',
                [styles.right]: place === 'right'
            }
        )}
        {...props}
    >
        {children}
    </Menubar.SubContent>
);

Submenu.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    place: PropTypes.oneOf(['left', 'right'])
};

/**
 * lk: A curried component, that makes a custom menubar item component.
 * @param {React.Component} ComponentToWrap A Radix menubar item-like component.
 * @returns {React.FC} The wrapped menubar item component, ready for use.
 */
const menuItemComponentGenerator = ComponentToWrap => {
    const Component = ({
        children,
        className,
        expanded = false,
        ...props
    }) => {
        const hasDivider = React.useContext(DividerContext);
        return (
            <ComponentToWrap
                className={classNames(
                    styles.menuItem,
                    styles.hoverable,
                    className,
                    {
                        [styles.expanded]: expanded,
                        [styles.menuSection]: hasDivider
                    }
                )}
                {...props}
            >
                {children}
            </ComponentToWrap>
        );
    };

    Component.propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        expanded: PropTypes.bool
    };

    return Component;
};

const MenuItem = menuItemComponentGenerator(Menubar.Item);
MenuItem.displayName = 'MenuItem';
MenuItem.propTypes = {
    ...MenuItem.propTypes,
    onClick: PropTypes.func
};

const MenuRadioItem = menuItemComponentGenerator(Menubar.RadioItem);
MenuRadioItem.displayName = 'MenuRadioItem';
MenuRadioItem.propTypes = {
    ...MenuRadioItem.propTypes,
    onSelect: PropTypes.func,
    textValue: PropTypes.string,
    value: PropTypes.string
};

const addDividerClassToFirstChild = (child, id) => (
    child ? (
        id === 0 ? (
            <DividerContext.Provider
                value
                key={id}
            >
                {child}
            </DividerContext.Provider>
        ) : child
    ) : null
);

const MenuSection = ({children}) => (
    <React.Fragment>
        <Menubar.Separator />
        {React.Children.map(children, addDividerClassToFirstChild)}
    </React.Fragment>
);

MenuSection.propTypes = {
    children: PropTypes.node
};

export {
    MenuComponent as default,
    MenuItem,
    menuItemComponentGenerator,
    MenuRadioItem,
    MenuSection,
    Submenu
};

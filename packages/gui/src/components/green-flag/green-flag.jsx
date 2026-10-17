import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import greenFlagIcon from './icon--green-flag.svg';
import styles from './green-flag.css';

const GreenFlagComponent = function (props) {
    const {
        active = false,
        className,
        onClick,
        title = 'Go',
        ...componentProps
    } = props;
    return (
        <img
            className={classNames(
                className,
                styles.greenFlag,
                {
                    [styles.isActive]: active
                }
            )}
            draggable={false}
            src={greenFlagIcon}
            title={title}
            onClick={onClick}
            // tw: also fire click when opening context menu (right click on all systems and alt+click on chromebooks)
            onContextMenu={onClick}
            {...componentProps}
        />
    );
};
GreenFlagComponent.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string
};
export default GreenFlagComponent;

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './delete-button.css';
import deleteIcon from './icon--delete.svg';

const DeleteButton = props => (
    <div
        aria-label="Delete"
        className={classNames(
            styles.deleteButton,
            props.className
        )}
        role="button"
        tabIndex={props.tabIndex ?? 0}
        onClick={props.onClick}
    >
        <div className={styles.deleteButtonVisible}>
            <img
                className={styles.deleteIcon}
                src={deleteIcon}
                draggable={false}
            />
        </div>
    </div>

);

DeleteButton.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    tabIndex: PropTypes.number
};

export default DeleteButton;

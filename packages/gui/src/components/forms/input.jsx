import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './input.css';

const Input = props => {
    const {small = false, componentRef, ...componentProps} = props;
    return (
        <input
            {...componentProps}
            className={classNames(
                styles.inputForm,
                props.className,
                {
                    [styles.inputSmall]: small
                }
            )}
            // lk: Support binding a ref to the input.
            ref={componentRef}
        />
    );
};

Input.propTypes = {
    className: PropTypes.string,
    componentRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({component: PropTypes.instanceOf(HTMLElement)})
    ]),
    small: PropTypes.bool
};

export default Input;

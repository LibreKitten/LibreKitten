// lk: This file became like this to lower the chance of merge conflicts from when I dropped defaultProps. - cat

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import styles from './close-button.css';
import closeIcon from './icon--close.svg';
import closeIconBlack from './icon--close-black.svg';
import closeIconOrange from './icon--close-orange.svg';
import backIcon from '../../lib/assets/icon--back.svg';
import backIconBlack from '../../lib/assets/icon--back-black.svg';

let closeIcons = {};
let backIcons = {};
const closeValues = {};

closeValues.SIZE_SMALL = 'small';
closeValues.SIZE_LARGE = 'large';

closeValues.COLOR_NEUTRAL = 'neutral';
closeValues.COLOR_BLACK = 'black';
closeValues.COLOR_GREEN = 'green';
closeValues.COLOR_ORANGE = 'orange';

closeValues.BACK_COLOR_NEUTRAL = 'neutral';
closeValues.BACK_COLOR_BLACK = 'black';

const CloseButtonInternal = props => (
    <div
        aria-label="Close"
        className={classNames(
            styles.closeButton,
            props.className,
            {
                [styles.small]: props.size === closeValues.SIZE_SMALL,
                [styles.large]: props.size === closeValues.SIZE_LARGE,
                [styles.black]: props.color === closeValues.COLOR_BLACK,
                [styles.orange]: props.color === closeValues.COLOR_ORANGE
            }
        )}
        role="button"
        tabIndex="0"
        onClick={props.onClick}
    >
        {props.buttonType === 'back' ?
            <img
                className={styles.backIcon}
                src={(props.color && closeIcons[props.color]) ?
                    backIcons[props.color] :
                    backIcon
                }
                draggable={false}
            /> :
            <img
                className={classNames(
                    styles.closeIcon,
                    {
                        [styles[props.color]]: (props.color !== closeValues.COLOR_NEUTRAL)
                    }
                )}
                src={(props.color && closeIcons[props.color]) ?
                    closeIcons[props.color] :
                    closeIcon
                }
                draggable={false}
            />
        }
    </div>
);

CloseButtonInternal.propTypes = {
    buttonType: PropTypes.oneOf(['back', 'close']),
    className: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    size: PropTypes.oneOf([closeValues.SIZE_SMALL, closeValues.SIZE_LARGE])
};

closeIcons = {
    [closeValues.COLOR_NEUTRAL]: closeIcon,
    [closeValues.COLOR_BLACK]: closeIconBlack,
    [closeValues.COLOR_GREEN]: closeIcon, // TODO: temporary, need green icon
    [closeValues.COLOR_ORANGE]: closeIconOrange
};
backIcons = {
    [closeValues.BACK_COLOR_NEUTRAL]: backIcon,
    [closeValues.BACK_COLOR_BLACK]: backIconBlack
};

// eslint-disable-next-line prefer-arrow-callback
const CloseButton = Object.assign(function CloseButton (props) {
    const mergedProps = {
        color: closeValues.COLOR_NEUTRAL,
        size: closeValues.SIZE_LARGE,
        buttonType: 'close',
        ...props
    };

    return <CloseButtonInternal {...mergedProps} />;
}, closeValues);

CloseButton.propTypes = CloseButtonInternal.propTypes;
export default CloseButton;

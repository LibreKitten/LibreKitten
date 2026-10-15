import React from 'react';
import PropTypes from 'prop-types';
import {Popover} from 'radix-ui';
import {injectIntl, intlShape, defineMessages, FormattedMessage} from 'react-intl';

import Label from '../forms/label.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import ToggleButtons from '../toggle-buttons/toggle-buttons.jsx';
import Dial from './dial.jsx';
import Box from '../box/box.jsx';

import styles from './direction-picker.css';

import allAroundIcon from '!../../lib/tw-recolor/build!./icon--all-around.svg';
import leftRightIcon from '!../../lib/tw-recolor/build!./icon--left-right.svg';
import dontRotateIcon from '!../../lib/tw-recolor/build!./icon--dont-rotate.svg';

const BufferedInput = BufferedInputHOC(Input);

const directionLabel = (
    <FormattedMessage
        defaultMessage="Direction"
        description="Sprite info direction label"
        id="gui.SpriteInfo.direction"
    />
);

const RotationStyles = {
    ALL_AROUND: 'all around',
    LEFT_RIGHT: 'left-right',
    DONT_ROTATE: "don't rotate"
};

const messages = defineMessages({
    allAround: {
        id: 'gui.directionPicker.rotationStyles.allAround',
        description: 'Button to change to the all around rotation style',
        defaultMessage: 'All Around'
    },
    leftRight: {
        id: 'gui.directionPicker.rotationStyles.leftRight',
        description: 'Button to change to the left-right rotation style',
        defaultMessage: 'Left/Right'
    },
    dontRotate: {
        id: 'gui.directionPicker.rotationStyles.dontRotate',
        description: 'Button to change to the dont rotate rotation style',
        defaultMessage: 'Do not rotate'
    }
});

// lk: Hack to fill sub-refs.
const fillRef = (ref, element) => {
    if (ref && typeof ref === 'object' && Object.hasOwn(ref, 'current')) {
        ref.current = element;
    } else if (typeof ref === 'function') {
        ref(element);
    }
};

// These rules are so ridiculous. They all come crashing down when I try using hooks in a functional component. - cat
// eslint-disable-next-line prefer-arrow-callback, react/display-name
const LKDirectionInput = React.forwardRef(({popoverOpen, ...props}, forwardedRef) => {
    const inputRef = React.useRef(null);
    React.useEffect(() => {
        // lk: Hack to re-focus the input after waiting for something to happen. A render? idrk.
        setTimeout(() => {
            if (popoverOpen && inputRef.current instanceof HTMLInputElement) inputRef.current.focus();
        }, 0);
    }, [popoverOpen]);

    const componentRef = element => {
        fillRef(forwardedRef, element);
        fillRef(inputRef, element);
    };

    return (
        <BufferedInput
            // eslint-disable-next-line react/jsx-no-bind
            componentRef={componentRef}
            {...props}
        />
    );
});

LKDirectionInput.propTypes = {
    popoverOpen: PropTypes.bool.isRequired
};

const DirectionPicker = props => (
    <Label
        secondary
        above={props.labelAbove}
        text={directionLabel}
    >
        <Popover.Root
            open={props.popoverOpen}
            onOpenChange={props.onOpenChange}
        >
            <Popover.Trigger asChild>
                <LKDirectionInput
                    small
                    disabled={props.disabled}
                    label={directionLabel}
                    tabIndex="0"
                    type="number"
                    value={props.disabled ? '' : props.direction}
                    onSubmit={props.onChangeDirection}
                    popoverOpen={props.popoverOpen}
                />
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    side="top"
                    sideOffset={4}
                    className="Popover-body"
                >
                    <Box className="Popover">
                        <Dial
                            direction={props.direction}
                            onChange={props.onChangeDirection}
                        />
                        <ToggleButtons
                            className={styles.buttonRow}
                            buttons={[
                                {
                                    handleClick: props.onClickAllAround,
                                    icon: allAroundIcon,
                                    isSelected: props.rotationStyle === RotationStyles.ALL_AROUND,
                                    title: props.intl.formatMessage(messages.allAround)
                                },
                                {
                                    handleClick: props.onClickLeftRight,
                                    icon: leftRightIcon,
                                    isSelected: props.rotationStyle === RotationStyles.LEFT_RIGHT,
                                    title: props.intl.formatMessage(messages.leftRight)
                                },
                                {
                                    handleClick: props.onClickDontRotate,
                                    icon: dontRotateIcon,
                                    isSelected: props.rotationStyle === RotationStyles.DONT_ROTATE,
                                    title: props.intl.formatMessage(messages.dontRotate)
                                }
                            ]}
                        />
                    </Box>
                    <Popover.Arrow
                        className="Popover-tipShape"
                        width={14}
                        height={7}
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    </Label>
);

DirectionPicker.propTypes = {
    direction: PropTypes.number,
    disabled: PropTypes.bool.isRequired,
    intl: intlShape,
    labelAbove: PropTypes.bool,
    onChangeDirection: PropTypes.func.isRequired,
    onClickAllAround: PropTypes.func.isRequired,
    onClickDontRotate: PropTypes.func.isRequired,
    onClickLeftRight: PropTypes.func.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    popoverOpen: PropTypes.bool.isRequired,
    rotationStyle: PropTypes.string
};

DirectionPicker.defaultProps = {
    labelAbove: false
};

const WrappedDirectionPicker = injectIntl(DirectionPicker);

export {
    WrappedDirectionPicker as default,
    RotationStyles
};

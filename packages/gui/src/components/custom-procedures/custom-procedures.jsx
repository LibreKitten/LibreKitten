import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../containers/modal.jsx';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import {Theme} from '../../lib/themes';

import booleanInputIcon from './icon--boolean-input.svg';
import textInputIcon from './icon--text-input.svg';
import labelIcon from './icon--label.svg';

import styles from './custom-procedures.css';

const messages = defineMessages({
    myblockModalTitle: {
        defaultMessage: 'Make a Block',
        description: 'Title for the modal where you create a custom block.',
        id: 'gui.customProcedures.myblockModalTitle'
    }
});

const hexValidator = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/;
const processColor = (color, theme) => {
    const colorPalettes = theme.getBlockColors();

    const useDefaultColor = () => ({
        primary: colorPalettes.more.primary,
        secondary: colorPalettes.more.secondary,
        tertiary: colorPalettes.more.tertiary,
        quaternary: colorPalettes.more.quaternary
    });

    if (!(color && color !== 'null')) return useDefaultColor();

    const themer = theme.getCustomBlockColors();

    if (color.startsWith('#')) {
        // If we reached here, the colour is likely a hex code, but we should validate it to make sure.
        if (!color.match(hexValidator)) return useDefaultColor();
        return {
            primary: themer.primary(color),
            secondary: themer.secondary(color),
            tertiary: themer.tertiary(color),
            quaternary: themer.quaternary(color)
        };
    }

    // If we reached here, the colour is likely from the palette, but we should check if it is.
    if (!(color in colorPalettes)) return useDefaultColor();
    const procPalette = colorPalettes[color];
    if (!('primary' in procPalette)) return useDefaultColor();

    return procPalette;
};


// lk: added custom colors
const CustomColor = props => {
    const isSelected = props.currentColor.startsWith('#') === true;
    const inputRef = React.useRef(null);

    const handleClickInput = React.useCallback(
        e => props.setColor(e.target.value), [props.setColor]
    );
    const handleClickButton = React.useCallback(
        () => inputRef.current.click(), [inputRef.current]
    );

    return (
        <>
            <button
                className={classNames(styles.colorButton, styles.colorPicker,
                    isSelected ? styles.active : null
                )}
                style={{
                    backgroundColor: isSelected ? props.currentColor : null
                }}
                onClick={handleClickButton}
            />
            <input
                onChange={handleClickInput}
                ref={inputRef}
                style={{display: 'none'}}
                type="color"
                value={isSelected ? props.currentColor : '#42d66a'}
            />
        </>
    );
};

CustomColor.propTypes = {
    currentColor: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired
};

const PrefilledColor = props => {
    const isSelected = props.currentColor === props.colorToSet;
    const color = props.colorToSet;
    const theme = props.theme;
    
    const buttonPalette = React.useMemo(() => processColor(color, theme), [color, theme]);

    const handleClick = React.useCallback(
        () => props.setColor(props.colorToSet), [props.setColor]
    );

    return (
        <button
            className={classNames(styles.colorButton, isSelected ? styles.active : null)}
            style={{
                backgroundColor: buttonPalette.primary,
                borderColor: buttonPalette.tertiary
            }}
            onClick={handleClick}
        />
    );
};

PrefilledColor.propTypes = {
    colorToSet: PropTypes.string.isRequired,
    currentColor: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired,
    theme: PropTypes.instanceOf(Theme)
};

const prefilledColorList = [
    'null',
    'motion',
    'looks',
    'sounds',
    'control',
    'event',
    'sensing',
    'pen',
    'operators',
    'data',
    'data_lists'
];

const CustomProcedures = props => (
    <Modal
        className={styles.modalContent}
        contentLabel={props.intl.formatMessage(messages.myblockModalTitle)}
        onRequestClose={props.onCancel}
        id="customProceduresModal"
    >
        <Box
            className={styles.workspace}
            componentRef={props.componentRef}
        />
        <Box className={styles.body}>
            <div className={styles.optionsRow}>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={props.onAddTextNumber}
                >
                    <img
                        className={styles.optionIcon}
                        src={textInputIcon}
                        draggable={false}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add an input"
                            description="Label for button to add a number/text input"
                            id="gui.customProcedures.addAnInputNumberText"
                        />
                    </div>
                    <div className={styles.optionDescription}>
                        <FormattedMessage
                            defaultMessage="number or text"
                            description="Description of the number/text input type"
                            id="gui.customProcedures.numberTextType"
                        />
                    </div>
                </div>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={props.onAddBoolean}
                >
                    <img
                        className={styles.optionIcon}
                        src={booleanInputIcon}
                        draggable={false}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add an input"
                            description="Label for button to add a boolean input"
                            id="gui.customProcedures.addAnInputBoolean"
                        />
                    </div>
                    <div className={styles.optionDescription}>
                        <FormattedMessage
                            defaultMessage="boolean"
                            description="Description of the boolean input type"
                            id="gui.customProcedures.booleanType"
                        />
                    </div>
                </div>
                <div
                    className={styles.optionCard}
                    role="button"
                    tabIndex="0"
                    onClick={props.onAddLabel}
                >
                    <img
                        className={styles.optionIcon}
                        src={labelIcon}
                        draggable={false}
                    />
                    <div className={styles.optionTitle}>
                        <FormattedMessage
                            defaultMessage="Add a label"
                            description="Label for button to add a label"
                            id="gui.customProcedures.addALabel"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.checkboxRow}>
                <label>
                    <input
                        checked={props.warp}
                        type="checkbox"
                        onChange={props.onToggleWarp}
                    />
                    <FormattedMessage
                        defaultMessage="Run without screen refresh"
                        description="Label for checkbox to run without screen refresh"
                        id="gui.customProcedures.runWithoutScreenRefresh"
                    />
                </label>
            </div>
            <Box className={styles.colorRow}>
                {prefilledColorList.map((color, i) => (
                    <PrefilledColor
                        colorToSet={color}
                        currentColor={props.color}
                        key={i}
                        setColor={props.setColor}
                        theme={props.theme}
                    />
                ))}
                <CustomColor
                    currentColor={props.color}
                    setColor={props.setColor}
                />
            </Box>
            <Box className={styles.buttonRow}>
                <button
                    className={styles.cancelButton}
                    onClick={props.onCancel}
                >
                    <FormattedMessage
                        defaultMessage="Cancel"
                        description="Label for button to cancel custom procedure edits"
                        id="gui.customProcedures.cancel"
                    />
                </button>
                <button
                    className={styles.okButton}
                    onClick={props.onOk}
                >
                    <FormattedMessage
                        defaultMessage="OK"
                        description="Label for button to save new custom procedure"
                        id="gui.customProcedures.ok"
                    />
                </button>
            </Box>
        </Box>
    </Modal>
);

CustomProcedures.propTypes = {
    color: PropTypes.string.isRequired,
    componentRef: PropTypes.func.isRequired,
    intl: intlShape,
    onAddBoolean: PropTypes.func.isRequired,
    onAddLabel: PropTypes.func.isRequired,
    onAddTextNumber: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onToggleWarp: PropTypes.func.isRequired,
    setColor: PropTypes.func.isRequired,
    theme: PropTypes.instanceOf(Theme),
    warp: PropTypes.bool.isRequired
};

export default injectIntl(CustomProcedures);

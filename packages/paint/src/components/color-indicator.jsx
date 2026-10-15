import React from 'react';
import PropTypes from 'prop-types';
import {Popover} from 'radix-ui';

import ColorButton from './color-button/color-button.jsx';
import ColorPicker from '../containers/color-picker.jsx';
import InputGroup from './input-group/input-group.jsx';
import Label from './forms/label.jsx';
import Box from './box/box.jsx';

import GradientTypes from '../lib/gradient-types';

const ColorIndicatorComponent = props => (
    <InputGroup
        className={props.className}
        disabled={props.disabled}
    >
        <Popover.Root
            open={props.colorModalVisible}
            onOpenChange={props.onOpenChange}
        >
            <Popover.Trigger>
                {/* lk: TODO: Temporary div to lower chance of breakage. */}
                <div>
                    <Label text={props.label}>
                        <ColorButton
                            color={props.color}
                            color2={props.color2}
                            gradientType={props.gradientType}
                            onClick={props.onOpenColor}
                            outline={props.outline}
                        />
                    </Label>
                </div>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="Popover">
                    <Box className="Popover-body">
                        <ColorPicker
                            color={props.color}
                            color2={props.color2}
                            gradientType={props.gradientType}
                            shouldShowGradientTools={props.shouldShowGradientTools}
                            onChangeColor={props.onChangeColor}
                            onChangeGradientType={props.onChangeGradientType}
                            onSwap={props.onSwap}
                        />
                    </Box>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    </InputGroup>
);

ColorIndicatorComponent.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    color: PropTypes.string,
    color2: PropTypes.string,
    colorModalVisible: PropTypes.bool.isRequired,
    gradientType: PropTypes.oneOf(Object.keys(GradientTypes)).isRequired,
    label: PropTypes.string.isRequired,
    onChangeColor: PropTypes.func.isRequired,
    onChangeGradientType: PropTypes.func.isRequired,
    onOpenChange: PropTypes.func.isRequired,
    onOpenColor: PropTypes.func.isRequired,
    onSwap: PropTypes.func.isRequired,
    outline: PropTypes.bool.isRequired,
    shouldShowGradientTools: PropTypes.bool.isRequired
};

export default ColorIndicatorComponent;

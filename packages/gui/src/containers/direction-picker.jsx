import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';

import DirectionComponent, {RotationStyles} from '../components/direction-picker/direction-picker.jsx';

/**
 * @extends {React.Component}
 */
class DirectionPicker extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleOpenChange',
            'handleClickLeftRight',
            'handleClickDontRotate',
            'handleClickAllAround',
            'handleInputFocus'
        ]);
        this.state = {
            popoverOpen: false
        };
    }
    handleInputFocus () {
        this.setState({
            ...this.state,
            popoverOpen: true
        });
    }
    handleOpenChange (open) {
        this.setState({
            ...this.state,
            popoverOpen: open
        });
    }
    handleClickAllAround () {
        this.props.onChangeRotationStyle(RotationStyles.ALL_AROUND);
    }
    handleClickLeftRight () {
        this.props.onChangeRotationStyle(RotationStyles.LEFT_RIGHT);
    }
    handleClickDontRotate () {
        this.props.onChangeRotationStyle(RotationStyles.DONT_ROTATE);
    }
    render () {
        return (
            <DirectionComponent
                direction={this.props.direction}
                disabled={this.props.disabled}
                labelAbove={this.props.labelAbove}
                popoverOpen={this.state.popoverOpen && !this.props.disabled}
                rotationStyle={this.props.rotationStyle}
                onChangeDirection={this.props.onChangeDirection}
                onClickAllAround={this.handleClickAllAround}
                onClickDontRotate={this.handleClickDontRotate}
                onClickLeftRight={this.handleClickLeftRight}
                onOpenChange={this.handleOpenChange}
                onInputFocus={this.handleInputFocus}
            />
        );
    }
}

DirectionPicker.propTypes = {
    direction: PropTypes.number,
    disabled: PropTypes.bool,
    labelAbove: PropTypes.bool,
    onChangeDirection: PropTypes.func,
    onChangeRotationStyle: PropTypes.func,
    rotationStyle: PropTypes.string
};

export default DirectionPicker;

import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import {closeWelcomeModal} from '../reducers/modals';

import WelcomeModalComponent from '../components/lk-welcome-modal/welcome-modal.jsx';

import {sawWelcomeModal, setSawWelcomeModal} from '../lib/lk-welcome-modal-utils.js';

class WelcomeModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'dontShowAgainRef',
            'handleClose'
        ]);
        this.dontShowAgainNode = null;
    }

    dontShowAgainRef (node) {
        if (!node) return;
        node.checked = sawWelcomeModal();
        this.dontShowAgainNode = node;
    }

    handleClose () {
        setSawWelcomeModal(this.dontShowAgainNode.checked);
        this.props.onClose();
    }

    handleOpenStable () {
        window.open(`https://librekitten.org${window.location.pathname}`, '_blank');
    }

    render () {
        return (
            <WelcomeModalComponent
                dontShowAgainRef={this.dontShowAgainRef}
                isRtl={this.props.isRtl}
                onClose={this.handleClose}
                onOpenStable={this.handleOpenStable}
            />
        );
    }
}

WelcomeModal.propTypes = {
    isRtl: PropTypes.bool,
    onClose: PropTypes.func
};

const matchDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeWelcomeModal())
});

export default connect(
    null,
    matchDispatchToProps
)(WelcomeModal);

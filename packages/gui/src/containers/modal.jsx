import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {Theme} from '../lib/themes/index.js';

import ModalComponent from '../components/modal/modal.jsx';

// lk: This was refactored to use native HTML dialogs instead of react-modal.

/** @extends {React.Component} */
class Modal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'addEventListeners',
            'removeEventListeners',
            'handlePopState',
            'setRef',
            'pushHistory',
            'onRequestClose'
        ]);
        this.state = {
            mayRenderInner: false,
            pressingOutside: false
        };
        this.addEventListeners();
        /** @type {React.RefObject<HTMLDialogElement>} */
        this.dialogRef = null;
    }
    componentDidMount () {
        // Add a history event only if it's not currently for our modal. This
        // avoids polluting the history with many entries. We only need one.
        this.pushHistory(this.id, (history.state === null || history.state !== this.id));

        // lk: Bind dialog events.
        this.dialogRef.addEventListener('close', () => this.props.onRequestClose());
        this.dialogRef.addEventListener('pointerdown', e => {
            if (e.target === this.dialogRef) {
                this.setState({
                    ...this.state,
                    pressingOutside: true
                });
            } else {
                this.setState({
                    ...this.state,
                    pressingOutside: false
                });
            }
        });
        this.dialogRef.addEventListener('pointerup', e => {
            if (e.target === this.dialogRef && this.state.pressingOutside) {
                this.onRequestClose();
            }
            this.setState({
                ...this.state,
                pressingOutside: false
            });
        });
    }
    componentWillUnmount () {
        this.removeEventListeners();
        this.dialogRef.close();
    }
    setRef (ref) {
        const dialogExists = ref instanceof HTMLDialogElement;
        this.dialogRef = ref;
        if (dialogExists) ref.showModal();

        // lk: We defer any possible rendering of the dialog contents until after the dialog gets to
        // show, as to stop bugs from a child component possibly calculating element proportions while
        // it is still hidden.
        this.setState({mayRenderInner: dialogExists});
    }
    addEventListeners () {
        window.addEventListener('popstate', this.handlePopState);
    }
    removeEventListeners () {
        window.removeEventListener('popstate', this.handlePopState);
    }
    handlePopState () {
        // Whenever someone navigates, we want to be closed
        this.onRequestClose();
    }
    get id () {
        return `modal-${this.props.id}`;
    }
    pushHistory (state, push) {
        if (push) return history.pushState(state, this.id, null);
        history.replaceState(state, this.id, null);
    }
    onRequestClose () {
        this.dialogRef.close();
        this.props.onRequestClose();
    }
    render () {
        return (
            <ModalComponent
                {...this.props}
                dialogRef={this.setRef}
                mayRenderInner={this.state.mayRenderInner}
                requestClose={this.onRequestClose}
            />
        );
    }
}

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    isRtl: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
    theme: PropTypes.instanceOf(Theme)
};

const mapStateToProps = state => ({
    isRtl: state.locales.isRtl,
    theme: state.scratchGui.theme.theme
});

export default connect(
    mapStateToProps
)(Modal);

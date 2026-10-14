import bindAll from 'lodash.bindall';
import classNames from 'classnames';
import {Popover} from 'radix-ui';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './dropdown.css';

import dropdownIcon from '!../../tw-recolor/build!./dropdown-caret.svg';
import TWRenderRecoloredImage from '../../tw-recolor/render.jsx';

class Dropdown extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClosePopover',
            'handleOpenChange',
            'isOpen'
        ]);
        this.state = {
            isOpen: false
        };
    }
    handleClosePopover () {
        this.setState({
            isOpen: false
        });
    }
    handleOpenChange (open) {
        const newState = open;
        this.setState({
            isOpen: newState
        });
        if (newState && this.props.onOpen) {
            this.props.onOpen();
        }
    }
    isOpen () {
        return this.state.isOpen;
    }
    render () {
        return (
            <Popover.Root
                open={this.state.isOpen}
                onOpenChange={this.handleOpenChange}
                {...this.props}
            >
                <Popover.Trigger asChild>
                    <div
                        className={classNames(styles.dropdown, this.props.className, {
                            [styles.modOpen]: this.state.isOpen,
                            [styles.modClosed]: !this.state.isOpen
                        })}
                        onClick={this.handleToggleOpenState}
                    >
                        {this.props.children}
                        <TWRenderRecoloredImage
                            className={classNames(styles.dropdownIcon, {
                                [styles.modCaretUp]: this.state.isOpen
                            })}
                            draggable={false}
                            src={dropdownIcon}
                        />
                    </div>
                </Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content
                        // lk: TODO: Reimplement dropdown animation.
                        className={classNames('Popover-body', styles.dropdownAnimation)}
                        sideOffset={4}
                    >
                        {this.props.popoverContent}
                    </Popover.Content>
                </Popover.Portal>
            </Popover.Root>
        );
    }
}

Dropdown.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onOpen: PropTypes.func,
    onOuterAction: PropTypes.func,
    popoverContent: PropTypes.node.isRequired
};

export default Dropdown;

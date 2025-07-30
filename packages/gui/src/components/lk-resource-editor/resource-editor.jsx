import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {RenderedTarget} from 'scratch-vm';

// import fileUploadIcon from '../components/action-menu/icon--file-upload.svg';

import styles from './resource-editor.css';

import FileTree from './file-tree.jsx';
import TextEditor from './text-editor.jsx';

class ResourceEditor extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClick',
            'handleCreate',
            'handleEdit'
        ]);

        this.state = {
            resources: this.props.resources,
            openedResourceI: null,
            openedResourceText: null
        };
        this.editingTarget = this.props.editingTarget;
    }

    handleClick (element, path, grant) {
        const state = this.state;
        const i = this.editingTarget.getResourceIndexByName(path);
        if (i === -1) return false;

        const resources = this.editingTarget.sprite.resources;
        if (!resources[i]) return false;
        const resource = resources[i];
        // For some reason, an empty string is falsy; thus, we must do this instead.
        if (resource.text === false) return false;
        const text = resource.text;

        state.openedResourceI = i;
        state.openedResourceText = text;
        this.setState(state);

        grant();
    }

    handleCreate (path, content, grant) {
        this.props.onCreate(path, content, grant);
    }

    handleEdit (doc) {
        this.props.onEdit(doc, this.state.openedResourceI);
    }

    render () {
        return (
            <div className={styles.flexWrapper}>
                <FileTree
                    onClick={this.handleClick}
                    onCreate={this.handleCreate}
                    resources={this.state.resources}
                />
                <TextEditor
                    content={this.state.openedResourceText}
                    onEdit={this.handleEdit}
                />
            </div>
        );
    }
}

ResourceEditor.propTypes = {
    editingTarget: PropTypes.instanceOf(RenderedTarget),
    onCreate: PropTypes.func,
    onEdit: PropTypes.func,
    resources: PropTypes.array
};

export default ResourceEditor;

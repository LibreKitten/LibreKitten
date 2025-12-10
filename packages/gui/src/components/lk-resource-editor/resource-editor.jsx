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
            'handleDirClick',
            'handleDirToggle',
            'handleFileClick',
            'handleFileEdit'
        ]);

        this.state = {
            resources: this.props.resources,
            openedResourceI: null,
            openedResourceText: null
        };
        this.editingTarget = this.props.editingTarget;
    }

    handleDirClick (grant /* path */) {
        grant();
    }

    handleDirToggle (grant /* path */) {
        grant();
    }

    handleFileClick (grant, element, path) {
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

    handleFileEdit (doc) {
        this.props.onFileEdit(doc, this.state.openedResourceI);
    }

    render () {
        return (
            <div className={styles.flexWrapper}>
                <FileTree
                    onDirClick={this.handleDirClick}
                    onDirCreate={this.props.onDirCreate}
                    onDirDelete={this.props.onDirDelete}
                    onDirMove={this.props.onDirMove}
                    onDirRename={this.props.onDirRename}
                    onDirToggle={this.handleDirToggle}

                    onFileClick={this.handleFileClick}
                    onFileCreate={this.props.onFileCreate}
                    onFileDelete={this.props.onFileDelete}
                    onFileMove={this.props.onFileMove}
                    onFileRename={this.props.onFileRename}

                    resources={this.state.resources}
                    directories={this.props.directories}
                />
                <TextEditor
                    content={this.state.openedResourceText}
                    onEdit={this.handleFileEdit}
                />
            </div>
        );
    }
}

ResourceEditor.propTypes = {
    editingTarget: PropTypes.instanceOf(RenderedTarget),

    onDirCreate: PropTypes.func,
    onDirDelete: PropTypes.func,
    onDirMove: PropTypes.func,
    onDirRename: PropTypes.func,

    onFileCreate: PropTypes.func,
    onFileDelete: PropTypes.func,
    onFileEdit: PropTypes.func,
    onFileMove: PropTypes.func,
    onFileRename: PropTypes.func,

    resources: PropTypes.array,
    directories: PropTypes.array
};

export default ResourceEditor;

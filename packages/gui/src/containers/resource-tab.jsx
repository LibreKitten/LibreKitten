import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import {connect} from 'react-redux';
import {setSpriteDirectories} from '../reducers/resources.js';

import ResourceEditor from '../components/lk-resource-editor/resource-editor.jsx';

const sliceLastChar = str => str.slice(0, str.length - 1);

class ResourceTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDirCreate',
            'handleDirDelete',
            'handleDirRename',

            'handleFileCreate',
            'handleFileDelete',
            'handleFileEdit',
            'handleFileRename'
        ]);

        this.vm = this.props.vm;
        this.editingTarget = this.vm.editingTarget;
    }

    handleDirCreate (grant, path) {
        const directories = this.props.directories;
        const spriteId = this.editingTarget.id;
        const spriteDirectories = [...directories[spriteId] ?? []];

        this.props.setSpriteDirectories(spriteId, [...spriteDirectories, sliceLastChar(path)]);
        grant();
    }

    handleDirDelete (grant, path) {
        const directories = this.props.directories;
        const spriteId = this.editingTarget.id;
        const spriteDirectories = [...directories[spriteId] ?? []];

        const resources = this.editingTarget.getResources();
        resources.forEach((resource, i) => {
            if (resource.name.startsWith(path)) this.vm.deleteResource(i);
        });

        // Clean up the lingering subdirectories.
        this.props.setSpriteDirectories(spriteId,
            spriteDirectories.filter(directory => !(directory.startsWith(path) || directory === sliceLastChar(path)))
        );

        grant();
    }

    handleDirRename (grant, oldPath, newPath) {
        const directories = this.props.directories;
        const spriteId = this.editingTarget.id;
        const spriteDirectories = [...directories[spriteId] ?? []];

        const resources = this.editingTarget.getResources();
        resources.forEach((resource, i) => {
            const name = resource.name;
            if (name.startsWith(oldPath)) this.vm.renameResource(i, name.replace(oldPath, newPath));
        });

        const index = spriteDirectories.indexOf(sliceLastChar(oldPath));
        if (index === -1) return;
        spriteDirectories[index] = sliceLastChar(newPath);

        this.props.setSpriteDirectories(
            spriteId,
            spriteDirectories
                .map(directory => (directory.startsWith(oldPath) ? directory.replace(oldPath, newPath) : directory))
        );
        
        grant();
    }

    handleFileCreate (grant, path /* content, bulk */) {
        this.vm.addResource({
            name: path,
            mime: 'text/plain',
            text: ''
        });
        grant();
    }

    handleFileDelete (grant, path) {
        const resource = this.editingTarget.getResourceIndexByName(path);
        if (resource === -1) return false;

        this.vm.deleteResource(resource);
        grant();
    }

    handleFileEdit (doc, i) {
        this.vm.editResource(i, doc);
    }

    handleFileRename (grant, oldPath, newPath) {
        const resource = this.editingTarget.getResourceIndexByName(oldPath);
        if (resource === -1) return false;

        this.vm.renameResource(resource, newPath);
        grant();
    }

    render () {
        return (
            <ResourceEditor
                editingTarget={this.editingTarget}

                onDirCreate={this.handleDirCreate}
                onDirDelete={this.handleDirDelete}
                onDirMove={this.handleDirRename}
                onDirRename={this.handleDirRename} // We can just reuse the same function here.

                onFileCreate={this.handleFileCreate}
                onFileDelete={this.handleFileDelete}
                onFileEdit={this.handleFileEdit}
                onFileMove={this.handleFileRename} // We can just reuse the same function here.
                onFileRename={this.handleFileRename}

                resources={this.editingTarget.sprite.resources}
                directories={this.props.directories[this.editingTarget.id]}
            />
        );
    }
}

ResourceTab.propTypes = {
    directories: PropTypes.func,
    setSpriteDirectories: PropTypes.func,
    vm: PropTypes.instanceOf(VM)
};

const mapStateToProps = state => ({
    directories: state.scratchGui.resources.directories
});

const mapDispatchToProps = dispatch => ({
    setSpriteDirectories: (sprite, directories) => dispatch(setSpriteDirectories(sprite, directories))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceTab);

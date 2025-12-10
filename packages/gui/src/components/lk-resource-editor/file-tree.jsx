import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';

import styles from './resource-editor.css';

import '../../lib/vendor/custom-file-tree/file-tree.esm.js';
import '../../lib/vendor/custom-file-tree/file-tree.css';

class FileTree extends React.Component {
    constructor (props) {
        super(props);
        this.container = React.createRef();
        this.fileTreeEl = null;
    }

    componentDidMount () {
        const resources = this.props.resources;
        const directories = this.props.directories;

        const resourceNames = [];
        resources.forEach(resource => {
            if (!resource.name) return;
            resourceNames.push(resource.name);
        });

        const container = this.container.current;
        // We need to do this instead of createElement, because otherwise the browser will throw an error.
        container.innerHTML = '<file-tree></file-tree>';

        this.fileTreeEl = container.querySelector('file-tree');
        this.fileTreeEl.setContent({
            files: resourceNames,
            dirs: directories
        });

        this.fileTreeEl.addEventListener(`file:click`, ({detail}) => {
            const {grant, element, path} = detail;
            this.props.onFileClick(grant, element, path);
        });
        this.fileTreeEl.addEventListener(`file:create`, ({detail}) => {
            const {grant, path, content, bulk} = detail;
            this.props.onFileCreate(grant, path, content, bulk);
        });
        this.fileTreeEl.addEventListener(`file:delete`, ({detail}) => {
            const {grant, path} = detail;
            this.props.onFileDelete(grant, path);
        });
        this.fileTreeEl.addEventListener(`file:move`, ({detail}) => {
            const {grant, oldPath, newPath} = detail;
            this.props.onFileMove(grant, oldPath, newPath);
        });
        this.fileTreeEl.addEventListener(`file:rename`, ({detail}) => {
            const {grant, oldPath, newPath} = detail;
            this.props.onFileRename(grant, oldPath, newPath);
        });

        this.fileTreeEl.addEventListener(`dir:click`, ({detail}) => {
            const {grant, path} = detail;
            this.props.onDirClick(grant, path);
        });
        this.fileTreeEl.addEventListener(`dir:create`, ({detail}) => {
            const {grant, path} = detail;
            this.props.onDirCreate(grant, path);
        });
        this.fileTreeEl.addEventListener(`dir:delete`, ({detail}) => {
            const {grant, path} = detail;
            this.props.onDirDelete(grant, path);
        });
        this.fileTreeEl.addEventListener(`dir:move`, ({detail}) => {
            const {grant, oldPath, newPath} = detail;
            this.props.onDirMove(grant, oldPath, newPath);
        });
        this.fileTreeEl.addEventListener(`dir:rename`, ({detail}) => {
            const {grant, oldPath, newPath} = detail;
            this.props.onDirRename(grant, oldPath, newPath);
        });
        this.fileTreeEl.addEventListener(`dir:toggle`, ({detail}) => {
            const {grant, path, currentState} = detail;
            this.props.onDirToggle(grant, path, currentState);
        });
    }

    shouldComponentUpdate () {
        return false;
    }

    render () {
        return (
            <Box>
                <div
                    className={styles.fileTree}
                    ref={this.container}
                />
            </Box>
        );
    }
}

FileTree.propTypes = {
    onDirClick: PropTypes.func,
    onDirCreate: PropTypes.func,
    onDirDelete: PropTypes.func,
    onDirMove: PropTypes.func,
    onDirRename: PropTypes.func,
    onDirToggle: PropTypes.func,

    onFileClick: PropTypes.func,
    onFileCreate: PropTypes.func,
    onFileDelete: PropTypes.func,
    onFileMove: PropTypes.func,
    onFileRename: PropTypes.func,

    resources: PropTypes.array,
    directories: PropTypes.array
};

export default FileTree;

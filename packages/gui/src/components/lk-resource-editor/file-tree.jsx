import PropTypes from 'prop-types';
import React from 'react';

import Box from '../box/box.jsx';

import styles from './resource-editor.css';

import 'custom-file-tree';
import 'custom-file-tree/dist/file-tree.css';

class FileTree extends React.Component {
    constructor (props) {
        super(props);
        this.fileTreeRef = React.createRef();
    }

    componentDidMount () {
        const resources = this.props.resources;
        const directories = this.props.directories;

        const resourceNames = [];
        resources.forEach(resource => {
            if (!resource.name) return;
            resourceNames.push(resource.name);
        });

        const fileTree = this.fileTreeRef.current;

        fileTree.setContent({
            files: resourceNames,
            dirs: directories
        });

        fileTree.addEventListener(`file:click`, ({detail}) => {
            const {grant, element, path} = detail;
            this.props.onFileClick(grant, element, path);
        });
        fileTree.addEventListener(`file:create`, ({detail}) => {
            const {grant, path, content, bulk} = detail;
            this.props.onFileCreate(grant, path, content, bulk);
        });
        fileTree.addEventListener(`file:delete`, ({detail}) => {
            const {grant, path} = detail;
            this.props.onFileDelete(grant, path);
        });
        fileTree.addEventListener(`file:move`, ({detail}) => {
            const {grant, oldPath, newPath} = detail;
            this.props.onFileMove(grant, oldPath, newPath);
        });
        fileTree.addEventListener(`file:rename`, ({detail}) => {
            const {grant, oldPath, newPath} = detail;
            this.props.onFileRename(grant, oldPath, newPath);
        });

        fileTree.addEventListener(`dir:click`, ({detail}) => {
            const {grant, path} = detail;
            this.props.onDirClick(grant, path);
        });
        fileTree.addEventListener(`dir:create`, ({detail}) => {
            const {grant, path} = detail;
            this.props.onDirCreate(grant, path);
        });
        fileTree.addEventListener(`dir:delete`, ({detail}) => {
            const {grant, path} = detail;
            this.props.onDirDelete(grant, path);
        });
        fileTree.addEventListener(`dir:move`, ({detail}) => {
            const {grant, oldPath, newPath} = detail;
            this.props.onDirMove(grant, oldPath, newPath);
        });
        fileTree.addEventListener(`dir:rename`, ({detail}) => {
            const {grant, oldPath, newPath} = detail;
            this.props.onDirRename(grant, oldPath, newPath);
        });
        fileTree.addEventListener(`dir:toggle`, ({detail}) => {
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
                <file-tree
                    class={styles.fileTree}
                    ref={this.fileTreeRef}
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

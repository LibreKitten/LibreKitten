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
            files: resourceNames
        });

        this.fileTreeEl.addEventListener(`file:click`, ({detail}) => {
            const {grant, element, path} = detail;
            this.props.onClick(grant, element, path);
        });
        this.fileTreeEl.addEventListener(`file:create`, ({detail}) => {
            const {grant, path, content, bulk} = detail;
            this.props.onCreate(grant, path, content, bulk);
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
    onClick: PropTypes.func,
    onCreate: PropTypes.func,
    resources: PropTypes.array
};

export default FileTree;

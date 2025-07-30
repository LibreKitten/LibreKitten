import PropTypes from 'prop-types';
import React from 'react';

import styles from './resource-editor.css';

import {basicSetup} from 'codemirror';
import {EditorView} from '@codemirror/view';
import {EditorState} from '@codemirror/state';

class TextEditor extends React.Component {
    constructor (props) {
        super(props);

        this.container = React.createRef();
        this.cm = null;
        this.extensions = [
            basicSetup,
            EditorView.updateListener.of(update => {
                if (!update.docChanged) return;
                this.props.onEdit(update.state.doc);
            })
        ];
    }

    componentDidMount () {
        this.cm = new EditorView({
            doc: this.getContent(),
            parent: this.container.current,
            extensions: this.extensions
        });
    }

    componentDidUpdate () {
        this.cm.setState(EditorState.create({
            doc: this.getContent(),
            extensions: this.extensions
        }));
    }

    componentWillUnmount () {
        this.cm.destroy();
    }

    getContent () {
        return this.props.content ?? '';
    }

    render () {
        return (
            <div
                className={styles.textEditor}
                ref={this.container}
            />
        );
    }
}

TextEditor.propTypes = {
    content: PropTypes.string,
    onEdit: PropTypes.func
};

export default TextEditor;

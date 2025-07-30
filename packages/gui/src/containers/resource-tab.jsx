import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import VM from 'scratch-vm';

import ResourceEditor from '../components/lk-resource-editor/resource-editor.jsx';

class ResourceTab extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCreate',
            'handleEdit'
        ]);

        this.vm = this.props.vm;
        this.editingTarget = this.vm.editingTarget;
    }

    handleCreate (path, content, grant) {
        this.editingTarget.addResource({
            name: path,
            mime: 'text/plain',
            text: ''
        });
        grant();
    }

    handleEdit (doc, i) {
        const resources = this.editingTarget.sprite.resources;
        resources[i].text = doc;
    }

    render () {
        return (
            <ResourceEditor
                editingTarget={this.editingTarget}
                onCreate={this.handleCreate}
                onEdit={this.handleEdit}
                resources={this.editingTarget.sprite.resources}
            />
        );
    }
}

ResourceTab.propTypes = {
    vm: PropTypes.instanceOf(VM)
};

export default ResourceTab;

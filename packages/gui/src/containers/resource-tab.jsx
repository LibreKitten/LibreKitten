import React from 'react';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';

import fileUploadIcon from '../components/action-menu/icon--file-upload.svg';

class ResourceTab extends React.Component {
    setFileInput (input) {
        this.fileInput = input;
        console.log('meow!');
    }

    handleFileUploadClick () {
        this.fileInput.click();
    }

    render () {
        return (
            <AssetPanel
                buttons={[
                    {
                        title: 'Test',
                        img: fileUploadIcon,
                        onClick: this.handleFileUploadClick.bind(this),
                        fileAccept: '',
                        // eslint-disable-next-line no-alert
                        fileChange: () => alert('test'),
                        fileInput: this.setFileInput.bind(this),
                        fileMultiple: true
                    }
                ]}
                dragType={null}
                isRtl={false}
                items={[]}
                selectedItemIndex={0}
                /* eslint-disable react/jsx-no-bind */
                onDeleteClick={() => null}
                onDrop={() => null}
                onDuplicateClick={() => null}
                onExportClick={() => null}
                onItemClick={() => null}
                /* eslint-enable react/jsx-no-bind */
            >
                {'test'}
            </AssetPanel>
        );
    }
}

export default ResourceTab;

import React from 'react';

import type VM from 'scratch-vm';

import AssetPanel from '../components/asset-panel/asset-panel.jsx';

import fileUploadIcon from '../components/action-menu/icon--file-upload.svg';

interface ResourceTabProps {
    children?: React.ReactNode;
    vm: VM;
};

class ResourceTab extends React.Component {
    declare props: ResourceTabProps;
    declare fileInput: HTMLInputElement;

    constructor (props: ResourceTabProps) {
        super(props);
    };

    setFileInput (input: any): void {
        this.fileInput = input;
        console.log('meow!');
    };

    handleFileUploadClick (): void {
        this.fileInput.click();
    };

    render (): React.ReactNode {
        return (
            <AssetPanel
                buttons={[
                    {
                        title: 'Test',
                        img: fileUploadIcon,
                        onClick: this.handleFileUploadClick.bind(this),
                        fileAccept: '',
                        fileChange: () => alert('test'),
                        fileInput: this.setFileInput.bind(this),
                        fileMultiple: true
                    }
                ]}
                dragType={null}
                isRtl={false}
                items={[]}
                selectedItemIndex={0}
                onDeleteClick={() => null}
                onDrop={() => null}
                onDuplicateClick={() => null}
                onExportClick={() => null}
                onItemClick={() => null}
            >
                test
            </AssetPanel>
        );
    };
};

export default ResourceTab;
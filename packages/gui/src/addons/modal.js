// Based on
// https://github.com/ScratchAddons/ScratchAddons/blob/master/addon-api/content-script/modal.js

import closeIcon from '../components/close-button/icon--close.svg';
import closeIconBlack from '../components/close-button/icon--close-black.svg';
import styles from './modal.css';

export const createEditorModal = (tab, title, {isOpen = false} = {}) => {
    const closeIconColor = tab.redux.state.scratchGui.theme.theme.getGuiColors()['ui-modal-header-close-button-color'];

    const modal = Object.assign(document.createElement('dialog'), {
        className: tab.scratchClass('modal_modal-content', 'lk-style-resets_style-resets'),
        ariaLabel: title
    });
    modal.addEventListener('click', e => e.stopPropagation());
    document.querySelector(`.${tab.scratchClass('interface_container')}`).appendChild(modal);
    if (isOpen) modal.showModal();
    const header = Object.assign(document.createElement('div'), {
        className: tab.scratchClass('modal_header')
    });
    modal.appendChild(header);
    header.appendChild(
        Object.assign(document.createElement('div'), {
            className: tab.scratchClass('modal_header-item', 'modal_header-item-title'),
            innerText: title
        })
    );
    const closeContainer = Object.assign(document.createElement('div'), {
        className: tab.scratchClass('modal_header-item', 'modal_header-item-close')
    });
    header.appendChild(closeContainer);
    const closeButton = Object.assign(document.createElement('div'), {
        className: tab.scratchClass('close-button_close-button', 'close-button_large',
            closeIconColor === 'black' && 'close-button_black'
        )
    });
    closeContainer.appendChild(closeButton);
    closeButton.appendChild(
        Object.assign(document.createElement('img'), {
            className: tab.scratchClass('close-button_close-icon',
                closeIconColor === 'black' && 'close-button_black'
            ),
            src: closeIconColor === 'black' ? closeIconBlack : closeIcon,
            draggable: false
        })
    );
    const content = Object.assign(document.createElement('div'), {
        className: styles.modalContent
    });
    modal.appendChild(content);
    return {
        container: modal,
        content,
        backdrop: document.createElement('div'), // lk: Just fake it, as there is no longer a backdrop.
        closeButton,
        open: () => {
            modal.showModal();
        },
        close: () => {
            modal.close();
        },
        remove: modal.remove.bind(modal)
    };
};

const createButtonRow = tab => {
    const buttonRow = Object.assign(document.createElement('div'), {
        className: tab.scratchClass('prompt_button-row')
    });
    const cancelButton = Object.assign(document.createElement('button'), {
        className: tab.scratchClass('prompt_cancel-button'),
        innerText: tab.scratchMessage('gui.prompt.cancel')
    });
    buttonRow.appendChild(cancelButton);
    const okButton = Object.assign(document.createElement('button'), {
        className: tab.scratchClass('prompt_ok-button'),
        innerText: tab.scratchMessage('gui.prompt.ok')
    });
    buttonRow.appendChild(okButton);
    return {buttonRow, cancelButton, okButton};
};

export const confirm = (tab, title, message, {useEditorClasses = false} = {}) => {
    // The garbage collector is going to hunt me down for this...
    const modalState = {
        pressingOutside: false
    };

    const {remove, container, content, backdrop, closeButton} = tab.createModal(title, {
        isOpen: true,
        useEditorClasses: useEditorClasses,
        useSizesClass: true
    });
    const mode = tab.editorMode !== null && useEditorClasses ? 'editor' : tab.clientVersion;
    if (mode === 'editor') {
        container.classList.add(tab.scratchClass('prompt_modal-content'));
        content.classList.add(tab.scratchClass('prompt_body'));
    }
    content.appendChild(
        Object.assign(document.createElement('div'), {
            className: tab.scratchClass('prompt_label'),
            innerText: message
        })
    );
    const {buttonRow, cancelButton, okButton} = createButtonRow(tab, mode);
    content.appendChild(buttonRow);
    okButton.focus();
    return new Promise(resolve => {
        const cancel = () => {
            remove();
            resolve(false);
        };
        const ok = () => {
            remove();
            resolve(true);
        };
        closeButton.addEventListener('click', cancel);
        cancelButton.addEventListener('click', cancel);
        okButton.addEventListener('click', ok);
        container.addEventListener('keydown', e => {
            if (e.key === 'Enter') ok();
            if (e.key === 'Escape') cancel();
        });
        // lk: Bind dialog events.
        container.addEventListener('close', () => container.remove.bind(container));
        container.addEventListener('pointerdown', e => {
            if (e.target === container) {
                modalState.pressingOutside = true;
            } else {
                modalState.pressingOutside = false;
            }
        });
        container.addEventListener('pointerup', e => {
            if (e.target === container && modalState.pressingOutside) {
                cancel();
            }
            modalState.pressingOutside = false;
        });
    });
};

export const prompt = (tab, title, message, defaultValue = '', {useEditorClasses = false} = {}) => {
    const modalState = {
        pressingOutside: false
    };

    const {remove, container, content, backdrop, closeButton} = tab.createModal(title, {
        isOpen: true,
        useEditorClasses: useEditorClasses,
        useSizesClass: true
    });
    container.classList.add(tab.scratchClass('prompt_modal-content'));
    content.classList.add(tab.scratchClass('prompt_body'));
    content.appendChild(
        Object.assign(document.createElement('div'), {
            className: tab.scratchClass('prompt_label'),
            innerText: message
        })
    );
    const input = Object.assign(document.createElement('input'), {
        className: tab.scratchClass('prompt_variable-name-text-input'),
        value: defaultValue
    });
    content.appendChild(input);
    input.focus();
    input.select();
    const {buttonRow, cancelButton, okButton} = createButtonRow(tab);
    content.appendChild(buttonRow);
    return new Promise(resolve => {
        const cancel = () => {
            remove();
            resolve(null);
        };
        const ok = () => {
            remove();
            resolve(input.value);
        };
        closeButton.addEventListener('click', cancel);
        cancelButton.addEventListener('click', cancel);
        okButton.addEventListener('click', ok);
        container.addEventListener('keydown', e => {
            if (e.key === 'Enter') ok();
            if (e.key === 'Escape') cancel();
        });
        // lk: Bind dialog events.
        container.addEventListener('close', () => container.remove.bind(container));
        container.addEventListener('pointerdown', e => {
            if (e.target === container) {
                modalState.pressingOutside = true;
            } else {
                modalState.pressingOutside = false;
            }
        });
        container.addEventListener('pointerup', e => {
            if (e.target === container && modalState.pressingOutside) {
                cancel();
            }
            modalState.pressingOutside = false;
        });
    });
};

const SAW_WELCOME_MODAL = 'lk:saw-welcome-modal';

const setSawWelcomeModal = toSet => {
    if (!toSet) return localStorage.removeItem(SAW_WELCOME_MODAL);
    localStorage.setItem(SAW_WELCOME_MODAL, '');
};

const sawWelcomeModal = () => localStorage.getItem(SAW_WELCOME_MODAL) !== null;

export {
    sawWelcomeModal,
    setSawWelcomeModal
};

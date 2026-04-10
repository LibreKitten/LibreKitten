/* eslint-disable no-unused-vars */

/**
 * lk: Responsible for handling dialogs. The default implementation returns bare minimum responses. To set up the
 * dialogs as you see fit, you can do something like this. This is a bare minimum example:
 * ```js
 * vm.runtime.dialogUtils.showAlert = ({toast, title, text, icon}) => alert(title);
 * vm.runtime.dialogUtils.showConfirmation = ({title, text, icon}) => confirm(title);
 * vm.runtime.dialogUtils.showInputDialog = ({title, text, icon}) => input(title);
 * ```
 */
class DialogUtils {
    /**
     * Shows an alert or a toast.
     * @param {Object} dialog - The object defining the data of the dialog.
     * @param {Boolean} dialog.toast - If this is true, the dialog is a toast; otherwise, it is an alert.
     * @param {String} dialog.title - The title of the dialog.
     * @param {String} dialog.text - The text of the dialog.
     * @param {?String} dialog.icon - The icon of the dialog; null means no icon.
     * @returns {Promise<void>}
     */
    showAlert ({toast, title, text, icon}) {
        return Promise.resolve();
    }

    /**
     * Shows a confirmation dialog.
     * @param {Object} dialog - The object defining the data of the dialog.
     * @param {String} dialog.title - The title of the dialog.
     * @param {String} dialog.text - The text of the dialog.
     * @param {?String} dialog.icon - The icon of the dialog; null means no icon.
     * @returns {Promise<Boolean>} Returns if the dialog was accepted or not.
     */
    showConfirmation ({title, text, icon}) {
        return Promise.resolve(false);
    }

    /**
     * Shows an alert or a toast.
     * @param {Object} dialog - The object defining the data of the dialog.
     * @param {String} dialog.title - The title of the dialog.
     * @param {String} dialog.text - The text of the dialog.
     * @param {?String} dialog.icon - The icon of the dialog; null means no icon.
     * @returns {Promise<String>} Returns the input for the dialog.
     */
    showInputDialog ({title, text, icon}) {
        return Promise.resolve('');
    }
}

module.exports = DialogUtils;

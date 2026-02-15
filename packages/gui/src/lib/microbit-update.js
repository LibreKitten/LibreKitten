// lk: Micro:bit installer has been removed.

/**
 * Requests a micro:bit from the browser then updates it with the Scratch-specific hex file.
 * The browser is expected to prompt the user to select a micro:bit.
 * @param {function(number): void} [progress] Optional function to call with progress updates in the range of [0..1].
 * @returns {Promise<void>} A Promise that resolves when the update is completed.
 * @throws {Error} If anything goes wrong while fetching the hex file or updating the micro:bit.
 */
const selectAndUpdateMicroBit = async () => {
    // No-op.
};

// lk: Always returns false.
/**
 * Checks if the browser supports updating a micro:bit.
 * @returns {boolean} True if the browser appears to support updating a micro:bit.
 */
const isMicroBitUpdateSupported = () => false;

export {
    isMicroBitUpdateSupported,
    selectAndUpdateMicroBit
};

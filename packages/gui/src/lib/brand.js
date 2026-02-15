const APP_NAME = 'LibreKitten';
// lk: Keep this in sync with the home page.
const DESCRIPTION =
    `${APP_NAME} is an alpha-quality block-based visual programming language based on TurboWarp, ` +
    'that allows you to program more than just the browser; you can program the server. You can ' +
    `reach the clouds with ${APP_NAME}!`;

// Legacy export format because this is used by some build-time scripts stuck in the past.
// eslint-disable-next-line import/no-commonjs
module.exports = {
    APP_NAME,
    DESCRIPTION
};

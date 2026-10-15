import {createRoot} from 'react-dom';

// lk: Allow forcing the startup error screen, so we can debug and edit it more easily.
const searchParams = new URLSearchParams(window.location.search);
if (searchParams.has('induce-startup-failure')) {
    throw new Error(
        'Induced startup failure. If someone sent this as a link to you, you don\'t need to worry about it. ' +
        'You can open LibreKitten in a new tab and go on about your day.'
    );
}

const appTarget = document.getElementById('app');

// Remove everything from the target to fix macOS Safari "Save Page As",
while (appTarget.firstChild) {
    appTarget.removeChild(appTarget.firstChild);
}

const render = children => {
    const root = createRoot(appTarget);
    root.render(children);

    if (window.SplashEnd) {
        window.SplashEnd();
    }
};

export default render;

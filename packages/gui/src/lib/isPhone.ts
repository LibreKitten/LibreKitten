const isPhone = () => {
    if (new URLSearchParams(window.location.search).has('forceisphone')) return true;
    // Credit to https://medium.com/@rchr/detecting-mobile-browsers-with-one-line-of-javascript-109713d5869c
    return Math.min(window.screen.width, window.screen.height) < 768;
}

export default isPhone;
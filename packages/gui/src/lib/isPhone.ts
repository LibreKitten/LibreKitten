const isPhone = () => {
    // lk: TODO: Actually detect if the device is a phone.
    let isMobile: boolean = false; 
    if (new URLSearchParams(window.location.search).has('forceisphone')) return true;
    return isMobile;
}

export default isPhone;
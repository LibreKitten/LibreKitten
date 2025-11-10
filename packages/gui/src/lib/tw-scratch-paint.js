import React from 'react';

import {COSTUMES_TAB_INDEX} from '../reducers/editor-tab';

let realScratchPaint;
const getRealScratchPaint = () => {
    if (!realScratchPaint) {
        realScratchPaint = require('scratch-paint');
    }
    return realScratchPaint;
};

const PaintEditor = props => React.createElement(getRealScratchPaint().default, props);

let hasSetupReducer = false;
const ScratchPaintReducer = (state, action) => {
    if (
        !hasSetupReducer && action.type === 'scratch-gui/navigation/ACTIVATE_TAB' &&
        action.activeTabIndex === COSTUMES_TAB_INDEX
    ) {
        hasSetupReducer = true;
    }
    if (hasSetupReducer) {
        return getRealScratchPaint().ScratchPaintReducer(state, action);
    }
    return {};
};

export {
    PaintEditor as default,
    ScratchPaintReducer
};

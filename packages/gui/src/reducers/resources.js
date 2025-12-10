const SET_SPRITE_DIRECTORIES = 'lk/resources/SET_SPRITE_DIRECTORIES';
const CLEAR_SPRITE_DIRECTORIES = 'lk/resources/CLEAR_SPRITE_DIRECTORIES';

const initialState = {
    directories: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_SPRITE_DIRECTORIES:
        return {
            ...state,
            directories: {
                ...state.directories,
                [action.sprite]: action.directories
            }
        };
    case CLEAR_SPRITE_DIRECTORIES:
        return {
            ...state,
            directories: {}
        };
    default:
        return state;
    }
};

const setSpriteDirectories = (sprite, directories) => ({
    type: SET_SPRITE_DIRECTORIES,
    sprite,
    directories
});

const clearSpriteDirectories = () => ({type: CLEAR_SPRITE_DIRECTORIES});

export {
    reducer as default,
    initialState as resourcesInitialState,
    setSpriteDirectories,
    clearSpriteDirectories
};

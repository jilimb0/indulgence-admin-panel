import {
    ERROR_HANDLE_BLUR_SETTINGS_ACTION,
    HANDLE_INPUT_SETTINGS_ACTION,
    SET_FILE_SETTINGS_ACTION, TOGGLE_SELECT_SETTINGS_ACTION
} from "../actions/settings";

let initialState = {
    changeSelf: null,
    errors: {}
};

const settings = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_FILE_SETTINGS_ACTION:
            return {
                ...state,
                changeSelf: {
                    ...state.changeSelf,
                    imageUrl: payload.fileImg.localImageUrl,
                    raw: payload.fileImg.raw
                }
            };

        case HANDLE_INPUT_SETTINGS_ACTION:
            return {
                ...state,
                changeSelf: {...state.changeSelf, ...payload.self},
            };

        case ERROR_HANDLE_BLUR_SETTINGS_ACTION:
            return {
                ...state,
                errors: {...state.errors, ...payload.errors}
            };

        case TOGGLE_SELECT_SETTINGS_ACTION:
            return {
                changeSelf: null,
                errors: {}
            };

        default:
            return state;
    }
};

export default settings;
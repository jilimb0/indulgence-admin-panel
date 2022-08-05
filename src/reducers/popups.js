import {CLOSE_POPUP_INFO_ACTION, SHOW_POPUP_INFO_ACTION} from "../actions/popups";

let initialState = {
    popupInfo: {
        show: false,
        msg: ""
    }
};

const popups = (state = initialState, {type, payload}) => {
    switch (type) {
        case SHOW_POPUP_INFO_ACTION:
            return {
                ...state,
                popupInfo: {
                    show: true,
                    msg: payload.msg
                }
            };

        case CLOSE_POPUP_INFO_ACTION:
            return {
                ...state,
                popupInfo: {
                    show: false,
                    msg: ""
                }
            };

        default:
            return state;
    }
};

export default popups;
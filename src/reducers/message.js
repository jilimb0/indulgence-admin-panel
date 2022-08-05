import {GET_MESSAGE_ACTION, SELECT_MESSAGE_ACTION, TOGGLE_SELECT_MESSAGE_ACTION} from "../actions/message";

let initialState = {
    messages: [],
    activeMessageIdx: null,
};

const message = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_MESSAGE_ACTION:
            return {
                ...state,
                messages: payload.messages,
            };

        case SELECT_MESSAGE_ACTION:
            return {
                ...state,
                activeMessageIdx: payload.idx,
            };

        case TOGGLE_SELECT_MESSAGE_ACTION:
            return {
                ...state,
                activeMessageIdx: null,
            };

        default:
            return state;
    }
};

export default message;
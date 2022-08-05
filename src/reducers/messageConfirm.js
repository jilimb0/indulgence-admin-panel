import {
    SHOW_MESSAGE_CONFIRM_ACTION,
    CLOSE_MESSAGE_CONFIRM_ACTION,
} from '../actions/messageConfirm';

let initialState = {
    show: false,
    msg: "",
    pendingAction: null
};

const messageConfirm = (state = initialState, {type, payload}) => {
    switch (type) {
        case SHOW_MESSAGE_CONFIRM_ACTION:
            return {...payload};

        case CLOSE_MESSAGE_CONFIRM_ACTION:
            return {
                show: false,
                msg: "",
                pendingAction: null
            };

        default:
            return state;
    }
};

export default messageConfirm;
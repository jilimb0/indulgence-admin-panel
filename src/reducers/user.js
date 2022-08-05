import {
    ADD_NEW_USER_ACTION,
    ERROR_HANDLE_BLUR_USER_ACTION,
    GET_USER_ACTION,
    HANDLE_INPUT_USER_ACTION, HANDLE_SELECT_USER_ACTION,
    SELECT_USER_ACTION, SET_FILE_USER_ACTION,
    TOGGLE_SELECT_USER_ACTION
} from "../actions/user";

let initialState = {
    users: [],
    activeUserIdx: null,
    userChanges: {},
    userErrors: {
        lastName: "",
        firstName: "",
        position: "",
        email: "",
        password: "",
        passwordReplay: "",
        workStatus: "",
        imageUrl: ""
    }
};

const user = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_USER_ACTION:
            return {
                ...state,
                users: payload.users,
            };

        case SELECT_USER_ACTION:
            return {
                ...state,
                activeUserIdx: payload.idx,
                userChanges: {},
                userErrors: {}
            };

        case TOGGLE_SELECT_USER_ACTION:
            return {
                ...state,
                activeUserIdx: null,
                userChanges: {},
                userErrors: {}
            };

        case HANDLE_INPUT_USER_ACTION:
            return {
                ...state,
                userChanges: {...state.userChanges, ...payload.user},
                userErrors: {...state.userErrors, ...payload.userErrors}
            };

        case HANDLE_SELECT_USER_ACTION:
            return {
                ...state,
                userChanges: {...state.userChanges, ...payload.user},
            };

        case ERROR_HANDLE_BLUR_USER_ACTION:
            return {
                ...state,
                userErrors: {...state.userErrors, ...payload.userErrors}
            };

        case SET_FILE_USER_ACTION:
            return {
                ...state,
                userChanges: {
                    ...state.userChanges,
                    imageUrl: payload.fileImg.localImageUrl,
                    raw: payload.fileImg.raw
                }
            };

        case ADD_NEW_USER_ACTION:
            return {
                ...state,
                activeUserIdx: state.users.length,
                userChanges: {
                    id: null,
                    roles: ["user"],
                    enabled: true,
                    lastName: "",
                    firstName: "",
                    email: "",
                    password: "",
                    passwordReplay: "",
                    imageUrl: null
                }
            };

        default:
            return state;
    }
};

export default user;
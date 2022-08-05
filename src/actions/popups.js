export const SHOW_POPUP_INFO_ACTION = 'SHOW_POPUP_INFO_ACTION';
export const CLOSE_POPUP_INFO_ACTION = 'CLOSE_POPUP_INFO_ACTION';

export const showPopupInfo = (msg) => {
    return dispatch => {
        dispatch({
            type: SHOW_POPUP_INFO_ACTION,
            payload: {msg}
        });
    };
};

export const onClosePopupInfo = () => {
    return dispatch => {
        dispatch({
            type: CLOSE_POPUP_INFO_ACTION,
        });
    };
};

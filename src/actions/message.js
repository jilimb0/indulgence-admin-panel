import apiService from "../services/apiService"

export const GET_MESSAGE_ACTION = "GET_MESSAGE_ACTION"
export const SELECT_MESSAGE_ACTION = "SELECT_MESSAGE_ACTION"
export const TOGGLE_SELECT_MESSAGE_ACTION = "TOGGLE_SELECT_MESSAGE_ACTION"

const getMessage = () => {
  return (dispatch) => {
    return apiService.getMessage(10000000, "", "").then((res) => {
      if (res && res.content) {
        dispatch({
          type: GET_MESSAGE_ACTION,
          payload: {
            messages: res.content,
          },
        })
      } else {
        return res
      }
    })
  }
}

const selectMessage = (idx) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_MESSAGE_ACTION,
      payload: { idx },
    })
  }
}

const toggleSelectMessage = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_MESSAGE_ACTION,
    })
  }
}

const deleteMessage = (id) => {
  return (dispatch) => {
    return apiService.deleteMessage(id).then((res) => {
      dispatch(getMessage())
    })
  }
}

const moveToPost = (id) => {
  return (dispatch) => {
    return apiService.postApproveMessage(id).then((res) => {
      dispatch(getMessage())
      dispatch({
        type: TOGGLE_SELECT_MESSAGE_ACTION,
      })
    })
  }
}

export {
  getMessage,
  selectMessage,
  toggleSelectMessage,
  deleteMessage,
  moveToPost,
}

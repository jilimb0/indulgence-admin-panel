export const SHOW_MESSAGE_CONFIRM_ACTION = "SHOW_MESSAGE_CONFIRM_ACTION"
export const CLOSE_MESSAGE_CONFIRM_ACTION = "CLOSE_MESSAGE_CONFIRM_ACTION"

export const showMessageConfirm = (msg, pendingAction, options) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_MESSAGE_CONFIRM_ACTION,
      payload: {
        show: true,
        msg,
        pendingAction,
        options,
      },
    })
  }
}

export const onCheck = (pendingConfirmAction, args) => {
  return (dispatch) => {
    args.delete_comments = true
    dispatch(pendingConfirmAction(args))
  }
}

export const onCancel = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MESSAGE_CONFIRM_ACTION,
      payload: {
        show: false,
        msg: "",
        pendingAction: null,
      },
    })
  }
}

export const onConfirm = (pendingConfirmAction, args) => {
  return (dispatch) => {
    dispatch(pendingConfirmAction(args))
    dispatch(onCancel())
  }
}

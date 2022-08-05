import apiService from "../services/apiService"
import { history } from "../services/history"
import { showPopupInfo } from "./popups"
import {
  INFO_CHECK_EMAIL,
  INCORRECT_PASSWORD,
  INCORRECT_EMAIL,
} from "../services/messagesConfig"

export const LOGIN_ACTION = "LOGIN_ACTION"
export const LOGOUT_ACTION = "LOGOUT_ACTION"
export const SET_USER_ACTION = "SET_USER_ACTION"
export const HANDLE_INPUT_POPUP_ACTION = "HANDLE_INPUT_POPUP_ACTION"
export const SEND_PASSWORD_REPAIR_ACTION = "SEND_PASSWORD_REPAIR_ACTION"

export const authorize = (email, password) => {
  return (dispatch) => {
    return apiService.checkEmailExist(email).then((res) => {
      res.data.exist === true
        ? apiService.authLogin(email, password).then((res) => {
            if (res === undefined) {
              dispatch(showPopupInfo(INCORRECT_PASSWORD))
            } else if (res && res.access_token) {
              dispatch({
                type: LOGIN_ACTION,
                payload: {
                  token: res.access_token,
                },
              })
              history.push("/")
            } else {
              return res
            }
          })
        : dispatch(showPopupInfo(INCORRECT_EMAIL)) && console.error(res)
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_ACTION,
      payload: {
        token: "",
      },
    })
    sessionStorage.clear()
    history.push("/login")
  }
}

export const getProfile = () => {
  return (dispatch) => {
    apiService.getSelf().then((user) => {
      dispatch({
        type: SET_USER_ACTION,
        payload: { user },
      })
    })
  }
}

export const handleInputPopup = (e) => {
  return (dispatch) => {
    dispatch({
      type: HANDLE_INPUT_POPUP_ACTION,
      payload: { value: e.target.value },
    })
  }
}

export const sendPassRepair = (email) => {
  return (dispatch) => {
    return apiService.checkEmailExist(email).then((res) => {
      res.data.exist === true
        ? apiService.passRepair(email).then((res) => {
            dispatch({
              type: SEND_PASSWORD_REPAIR_ACTION,
            })

            dispatch(showPopupInfo(INFO_CHECK_EMAIL))
          })
        : dispatch(showPopupInfo(INCORRECT_EMAIL)) && console.error(res)
    })
  }
}

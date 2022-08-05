import apiService from "../services/apiService"
import { history } from "../services/history"

export const SET_FILE_SETTINGS_ACTION = "SET_FILE_SETTINGS_ACTION"
export const HANDLE_INPUT_SETTINGS_ACTION = "HANDLE_INPUT_SETTINGS_ACTION"
export const ERROR_HANDLE_BLUR_SETTINGS_ACTION =
  "ERROR_HANDLE_BLUR_SETTINGS_ACTION"
export const TOGGLE_SELECT_SETTINGS_ACTION = "TOGGLE_SELECT_SETTINGS_ACTION"

const toggleSelectsSettings = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_SETTINGS_ACTION,
    })
    history.push("/")
  }
}

const settingsHandleInput = (e) => {
  const { name, value } = e.currentTarget
  return (dispatch) => {
    dispatch({
      type: HANDLE_INPUT_SETTINGS_ACTION,
      payload: {
        self: { [name]: value },
      },
    })
  }
}

const isNotEmptyValue = (name, value) => {
  if (!value.trim()) {
    return false
  }
  return true
}

const validateForm = (name, value) => {
  const isEmpty = isNotEmptyValue(name, value)
  return isEmpty
}

const settingsHandleBlur = (e) => {
  const { value, name } = e.currentTarget
  const valid = validateForm(name, value)
  if (!valid) {
    return (dispatch) => {
      dispatch({
        type: ERROR_HANDLE_BLUR_SETTINGS_ACTION,
        payload: {
          errors: {
            [name]: "Поле не должно быть пустым",
          },
        },
      })
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: ERROR_HANDLE_BLUR_SETTINGS_ACTION,
        payload: {
          errors: {
            [name]: "",
          },
        },
      })
    }
  }
}

const updatePass = ({ oldPass, newPass }) => {
  return (dispatch) => {
    return apiService.putSelfPassword(oldPass, newPass)
  }
}

const settingsSetFile = (e) => {
  const fileImg = {
    localImageUrl: URL.createObjectURL(e.target.files[0]),
    raw: e.target.files[0],
  }
  return (dispatch) => {
    dispatch({
      type: SET_FILE_SETTINGS_ACTION,
      payload: { fileImg },
    })
  }
}

const saveUser = (user) => {
  const data = new FormData()
  if (user.hasOwnProperty("imageUrl")) data.append("file", user.raw)
  if (user.hasOwnProperty("email")) data.append("email", user.email)
  if (user.hasOwnProperty("password")) data.append("password", user.password)
  if (user.hasOwnProperty("firstName")) data.append("firstName", user.firstName)
  if (user.hasOwnProperty("lastName")) data.append("lastName", user.lastName)
  return (dispatch) => {
    if (user.id) {
      return apiService.putUser(user.id, data).then((res) => {
        dispatch(toggleSelectsSettings())
      })
    } else {
      console.error("No user id", user)
    }
  }
}

export {
  settingsSetFile,
  settingsHandleInput,
  settingsHandleBlur,
  toggleSelectsSettings,
  saveUser,
  updatePass,
}

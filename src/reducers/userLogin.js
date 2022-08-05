import {
  HANDLE_INPUT_POPUP_ACTION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  SEND_PASSWORD_REPAIR_ACTION,
  SET_USER_ACTION,
} from "../actions/userLogin"

let initialState = {
  token: "",
  user: {},
  popupRepair: {
    show: false,
    inputValue: "",
  },
}

const userLogin = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_ACTION:
      return {
        ...state,
        token: payload.token,
      }
      

    case LOGOUT_ACTION:
      return {
        ...state,
        token: payload.token,
      }

    case SET_USER_ACTION:
      return {
        ...state,
        user: payload.user,
      }

    case HANDLE_INPUT_POPUP_ACTION:
      return {
        ...state,
        popupRepair: {
          ...state.popupRepair,
          inputValue: payload.value,
        },
      }
    case SEND_PASSWORD_REPAIR_ACTION:
      return {
        ...state,
        popupRepair: {
          inputValue: "",
          show: false,
        },
      }

    default:
      return state
  }
}

export default userLogin

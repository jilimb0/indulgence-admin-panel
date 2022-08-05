import {
  ADD_NEW_ADMIN_ACTION,
  ERROR_HANDLE_BLUR_ADMIN_ACTION,
  GET_ADMINS_ACTION,
  HANDLE_INPUT_ADMIN_ACTION,
  HANDLE_SELECT_POSITION_ACTION,
  SELECT_ADMIN_USER_ACTION,
  SET_FILE_ADMIN_ACTION,
  TOGGLE_SELECT_ADMIN_USER_ACTION,
} from "../actions/administration"

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
    imageUrl: "",
  },
}

const administration = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ADMINS_ACTION:
      return {
        ...state,
        users: payload.users,
      }

    case SELECT_ADMIN_USER_ACTION:
      return {
        ...state,
        activeUserIdx: payload.idx,
        userChanges: {},
        userErrors: {},
      }

    case TOGGLE_SELECT_ADMIN_USER_ACTION:
      return {
        ...state,
        activeUserIdx: null,
        userChanges: {},
        userErrors: {},
      }

    case HANDLE_INPUT_ADMIN_ACTION:
      return {
        ...state,
        userChanges: { ...state.userChanges, ...payload.user },
        userErrors: { ...state.userErrors, ...payload.userErrors },
      }

    case HANDLE_SELECT_POSITION_ACTION:
      return {
        ...state,
        userChanges: { ...state.userChanges, ...payload.user },
      }

    case ERROR_HANDLE_BLUR_ADMIN_ACTION:
      return {
        ...state,
        userErrors: { ...state.userErrors, ...payload.userErrors },
      }

    case SET_FILE_ADMIN_ACTION:
      return {
        ...state,
        userChanges: {
          ...state.userChanges,
          imageUrl: payload.fileImg.localImageUrl,
          raw: payload.fileImg.raw,
        },
      }

    case ADD_NEW_ADMIN_ACTION:
      return {
        ...state,
        activeUserIdx: state.users.length,
        userChanges: {
          id: null,
          roles: ["content"],
          enabled: true,
          lastName: "",
          firstName: "",
          email: "",
          password: "",
          passwordReplay: "",
          imageUrl: null,
        },
      }

    default:
      return state
  }
}

export default administration

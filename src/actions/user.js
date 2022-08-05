import apiService from "../services/apiService"

export const GET_USER_ACTION = "GET_USER_ACTION"
export const SELECT_USER_ACTION = "SELECT_USER_ACTION"
export const HANDLE_INPUT_USER_ACTION = "HANDLE_INPUT_USER_ACTION"
export const ERROR_HANDLE_BLUR_USER_ACTION = "ERROR_HANDLE_BLUR_USER_ACTION"
export const TOGGLE_SELECT_USER_ACTION = "TOGGLE_SELECT_USER_ACTION"
export const HANDLE_SELECT_USER_ACTION = "HANDLE_SELECT_USER_ACTION"
export const SET_FILE_USER_ACTION = "SET_FILE_USER_ACTION"
export const ADD_NEW_USER_ACTION = "ADD_NEW_USER_ACTION"

export const BLOCK_USER_PUBLICATION_ACTION = "BLOCK_USER_PUBLICATION_ACTION"
export const UNBLOCK_USER_PUBLICATION_ACTION = "UNBLOCK_USER_PUBLICATION_ACTION"

export const DELETE_USER_ACTION = "DELETE_USER_ACTION"

const getUsers = () => {
  return (dispatch) => {
    return apiService.getUsers(10000000, "", "user", "").then((res) => {
      if (res && res.content) {
        dispatch({
          type: GET_USER_ACTION,
          payload: {
            users: res.content,
          },
        })
      } else {
        return res
      }
    })
  }
}

const putUser = (user) => {
  const data = new FormData()
  if (user.hasOwnProperty("imageUrl")) data.append("file", user.raw)
  if (user.hasOwnProperty("email")) data.append("email", user.email)
  if (user.hasOwnProperty("password")) data.append("password", user.password)
  if (user.hasOwnProperty("firstName")) data.append("firstName", user.firstName)
  if (user.hasOwnProperty("lastName")) data.append("lastName", user.lastName)
  if (user.hasOwnProperty("lastName")) data.append("nickname", user.lastName)
  if (user.hasOwnProperty("roles")) data.append("role", user.roles[0])

  return (dispatch) => {
    return apiService.putUser(user.id, data).then((res) => {
      dispatch(getUsers())
    })
  }
}

const selectUser = (idx) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_USER_ACTION,
      payload: { idx },
    })
  }
}

const toggleSelectUser = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_USER_ACTION,
    })
  }
}

const handleInput = (e) => {
  const { name, value } = e.currentTarget
  return (dispatch) => {
    dispatch({
      type: HANDLE_INPUT_USER_ACTION,
      payload: {
        name,
        user: { [name]: value },
      },
    })
  }
}

const handleSelect = (options) => {
  let { name, value } = options
  if (name === "enabled") value = value === "active"
  return (dispatch) => {
    dispatch({
      type: HANDLE_SELECT_USER_ACTION,
      payload: {
        user: { [name]: value },
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

const handleBlur = (e) => {
  const { value, name } = e.currentTarget
  const valid = validateForm(name, value)
  if (!valid) {
    return (dispatch) => {
      dispatch({
        type: ERROR_HANDLE_BLUR_USER_ACTION,
        payload: {
          userErrors: {
            [name]: "Поле не должно быть пустым",
          },
        },
      })
    }
  } else {
    return (dispatch) => {
      dispatch({
        type: ERROR_HANDLE_BLUR_USER_ACTION,
        payload: {
          userErrors: {
            [name]: "",
          },
        },
      })
    }
  }
}

const userSetFile = (e) => {
  const fileImg = {
    localImageUrl: URL.createObjectURL(e.target.files[0]),
    raw: e.target.files[0],
  }
  return (dispatch) => {
    dispatch({
      type: SET_FILE_USER_ACTION,
      payload: { fileImg },
    })
  }
}

const blockUser = (id) => {
  return (dispatch) => {
    return apiService.putBlockUser(id).then((res) => {
      dispatch({
        type: BLOCK_USER_PUBLICATION_ACTION,
      })
      dispatch(getUsers())
    })
  }
}

const unBlockUser = (id) => {
  return (dispatch) => {
    return apiService.putUnblockUser(id).then((res) => {
      dispatch({
        type: UNBLOCK_USER_PUBLICATION_ACTION,
      })
      dispatch(getUsers())
    })
  }
}

const deleteUser = (id) => {
  return (dispatch) => {
    return apiService
      .deleteAdmin(id)
      .then((res) => console.log("deleteUser ", res))
  }
}

export {
  getUsers,
  selectUser,
  userSetFile,
  toggleSelectUser,
  handleInput,
  handleBlur,
  handleSelect,
  putUser,
  blockUser,
  unBlockUser,
  deleteUser,
}

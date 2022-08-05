import apiService from "../services/apiService"

export const GET_ADMINS_ACTION = "GET_ADMINS_ACTION"
export const SELECT_ADMIN_USER_ACTION = "SELECT_ADMIN_USER_ACTION"
export const TOGGLE_SELECT_ADMIN_USER_ACTION = "TOGGLE_SELECT_ADMIN_USER_ACTION"
export const HANDLE_INPUT_ADMIN_ACTION = "HANDLE_INPUT_ADMIN_ACTION"
export const HANDLE_SELECT_POSITION_ACTION = "HANDLE_SELECT_POSITION_ACTION"
export const ERROR_HANDLE_BLUR_ADMIN_ACTION = "ERROR_HANDLE_BLUR_ADMIN_ACTION"
export const SET_FILE_ADMIN_ACTION = "SET_FILE_ADMIN_ACTION"
export const ADD_NEW_ADMIN_ACTION = "ADD_NEW_ADMIN_ACTION"
export const DELETE_ADMIN_ACTION = "DELETE_ADMIN_ACTION"

const getAdmins = () => {
  return (dispatch) => {
    return apiService
      .getUsers(10000000, "", "administration", "")
      .then((res) => {
        if (res && res.content) {
          dispatch({
            type: GET_ADMINS_ACTION,
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

const putAdmin = ({ user, oldUser }) => {
  let data = new FormData()
  if (user.hasOwnProperty("imageUrl")) data.append("file", user.raw)
  if (user.hasOwnProperty("email")) data.append("email", user.email)
  if (user.hasOwnProperty("password")) data.append("password", user.password)
  if (user.hasOwnProperty("firstName")) data.append("firstName", user.firstName)
  if (user.hasOwnProperty("lastName")) data.append("lastName", user.lastName)
  if (user.hasOwnProperty("roles")) data.append("role", [user.roles[0]])
  if (user.hasOwnProperty("lastName")) data.append("nickname", user.lastName)
  return (dispatch) => {
    if (user.id) {
      return apiService.putUser(user.id, data).then((res) => {
        if (user.hasOwnProperty("roles")) {
          apiService
            .putRemoveRole({ id: user.id, role: oldUser.roles[0] })
            .then((res) => {
              console.log("actions putRemoveRole res =", res)
              apiService
                .putGrantRole({ id: user.id, role: user.roles[0] })
                .then((res) => {
                  console.log("actions putGrantRole res =", res)
                })
            })
        }

        if (user.hasOwnProperty("enabled")) {
          user.enabled
            ? apiService.putUnblockUser(user.id).then((res) => {
                console.log("actions putUnblockUser res =", res)
              })
            : apiService.putBlockUser(user.id).then((res) => {
                console.log("actions putBlockUser res =", res)
              })
        }
      })
    } else {
      return apiService.postNewUser(data).then((res) => console.log(res))
    }
  }
}

const selectAdminUser = (idx) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_ADMIN_USER_ACTION,
      payload: { idx },
    })
  }
}

const toggleSelectAdminUser = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_ADMIN_USER_ACTION,
    })
  }
}

const adminHandleInput = (e) => {
  const { name, value } = e.currentTarget
  return (dispatch) => {
    dispatch({
      type: HANDLE_INPUT_ADMIN_ACTION,
      payload: {
        name,
        user: { [name]: value },
      },
    })
  }
}

const adminHandleSelect = (options) => {
  let { name, value } = options

  if (name === "enabled") value = value === "active"
  if (name === "roles") value = [value]

  return (dispatch) => {
    dispatch({
      type: HANDLE_SELECT_POSITION_ACTION,
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

const adminHandleBlur = (e) => {
  const { value, name } = e.currentTarget
  const valid = validateForm(name, value)
  if (!valid) {
    return (dispatch) => {
      dispatch({
        type: ERROR_HANDLE_BLUR_ADMIN_ACTION,
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
        type: ERROR_HANDLE_BLUR_ADMIN_ACTION,
        payload: {
          userErrors: {
            [name]: "",
          },
        },
      })
    }
  }
}

const adminSetFile = (e) => {
  const fileImg = {
    localImageUrl: URL.createObjectURL(e.target.files[0]),
    raw: e.target.files[0],
  }
  return (dispatch) => {
    dispatch({
      type: SET_FILE_ADMIN_ACTION,
      payload: { fileImg },
    })
  }
}

const addNewAdmin = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_NEW_ADMIN_ACTION,
      payload: {},
    })
  }
}

const deleteAdmin = (id) => {
  return (dispatch) => {
    return apiService
      .deleteAdmin(id)
      .then((res) => console.log("deleteUser ", res))
  }
}

export {
  getAdmins,
  selectAdminUser,
  toggleSelectAdminUser,
  adminHandleInput,
  adminHandleBlur,
  adminHandleSelect,
  putAdmin,
  adminSetFile,
  addNewAdmin,
  deleteAdmin,
}

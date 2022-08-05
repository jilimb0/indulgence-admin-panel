import apiService from "../services/apiService"
import { addTimeToDate } from "../services/utils"

export const GET_PUBLICATIONS_ACTION = "GET_PUBLICATIONS_ACTION"
export const SELECT_PUBLICATIONS_ACTION = "SELECT_PUBLICATIONS_ACTION"
export const TOGGLE_SELECT_PUBLICATIONS_ACTION =
  "TOGGLE_SELECT_PUBLICATIONS_ACTION"
export const SET_FILE_PUBLICATIONS_ACTION = "SET_FILE_PUBLICATIONS_ACTION"
export const HANDLE_INPUT_PUBLICATIONS_ACTION =
  "HANDLE_INPUT_PUBLICATIONS_ACTION"

export const GET_COMMENTS_PUBLICATION_BY_ID_ACTION =
  "GET_COMMENTS_PUBLICATION_BY_ID_ACTION"
export const GET_COMMENTS_REPLIES_BY_ID_ACTION =
  "GET_COMMENTS_REPLIES_BY_ID_ACTION"
export const SHOW_COMMENTS_ACTION = "SHOW_COMMENTS_ACTION"
export const CLOSE_COMMENTS_ACTION = "CLOSE_COMMENTS_ACTION"
export const SHOW_REPLIES_ACTION = "SHOW_REPLIES_ACTION"
export const CLOSE_REPLIES_ACTION = "CLOSE_REPLIES_ACTION"

export const SET_ACTIVE_COMMENT_ACTION = "SET_ACTIVE_COMMENT_ACTION"
export const SET_ACTIVE_COMMENT_ID_ACTION = "SET_ACTIVE_COMMENT_ID_ACTION"
export const CLOSE_ACTIVE_COMMENT_ACTION = "CLOSE_ACTIVE_COMMENT_ACTION"

export const SET_TIME_ACTION = "SET_TIME_ACTION"
export const SET_DATE_ACTION = "SET_DATE_ACTION"

export const ADD_NEW_PUBLICATION_ACTION = "ADD_NEW_PUBLICATION_ACTION"

export const BLOCK_USER_PUBLICATION_ACTION = "BLOCK_USER_PUBLICATION_ACTION"
export const UNBLOCK_USER_PUBLICATION_ACTION = "UNBLOCK_USER_PUBLICATION_ACTION"
export const DELETE_COMMENT_PUBLICATION_ACTION =
  "DELETE_COMMENT_PUBLICATION_ACTION"

const getPublications = () => {
  return (dispatch) => {
    return apiService.getPublications(10000000, "", "").then((res) => {
      if (res && res.content) {
        dispatch({
          type: GET_PUBLICATIONS_ACTION,
          payload: {
            publications: res.content,
          },
        })
      } else {
        return res
      }
    })
  }
}

const selectPublication = (idx) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_PUBLICATIONS_ACTION,
      payload: { idx },
    })
  }
}

const toggleSelectPublication = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_PUBLICATIONS_ACTION,
    })
    dispatch(getPublications())
  }
}

const publicationSetFile = (e) => {
  const fileImg = {
    localImageUrl: URL.createObjectURL(e.target.files[0]),
    raw: e.target.files[0],
  }
  return (dispatch) => {
    dispatch({
      type: SET_FILE_PUBLICATIONS_ACTION,
      payload: { fileImg },
    })
  }
}

const publicationHandleInput = (e) => {
  const { name, value, type } = e.target
  let setValue = value
  if (type === "checkbox") setValue = e.target.checked
  return (dispatch) => {
    dispatch({
      type: HANDLE_INPUT_PUBLICATIONS_ACTION,
      payload: {
        publication: { [name]: setValue },
      },
    })
  }
}

const savePublication = (publication) => {
  let data = new FormData()
  if (publication.hasOwnProperty("full_text"))
    data.append("preview", publication.full_text.substr(0, 170))
  if (publication.hasOwnProperty("poll_enabled"))
    data.append("enablePoll", publication.poll_enabled)
  if (publication.hasOwnProperty("full_text"))
    data.append("content", publication.full_text)
  if (publication.hasOwnProperty("raw")) data.append("file", publication.raw)

  if (
    publication.hasOwnProperty("posted_at") &&
    publication.posted_at === null
  ) {
    console.log("1", publication.posted_at)

    data.append("posted_at", publication.posted_at)
  } else if (
    publication.hasOwnProperty("posted_at") &&
    publication.posted_at !== null
  ) {
    console.log("2", publication.posted_at)
    data.append("publishedAt", publication.posted_at)
  }

  return (dispatch) => {
    if (publication.id) {
      return apiService.putStory(publication.id, data).then((res) => {
        dispatch(getPublications())
      })
    } else {
      return apiService.postStory(data).then((res) => {
        dispatch(getPublications())
      })
    }
  }
}

const deletePublication = (id) => {
  return (dispatch) => {
    return apiService.deletePublication(id).then((res) => {
      dispatch(getPublications())
    })
  }
}

const getCommentsPublication = (publicationId) => {
  return (dispatch) => {
    return apiService.getCommentsPublication(publicationId).then((res) => {
      if (res && res.content) {
        dispatch({
          type: GET_COMMENTS_PUBLICATION_BY_ID_ACTION,
          payload: {
            comments: res.content,
          },
        })
      } else {
        console.error("error apiService.getCommentsPublication", res)
        return res
      }
    })
  }
}

const getCommentsReplies = (publicationId, commentId) => {
  return (dispatch) => {
    return apiService
      .getCommentsReplies(publicationId, commentId)
      .then((res) => {
        if (res && res.content) {
          dispatch({
            type: GET_COMMENTS_REPLIES_BY_ID_ACTION,
            payload: {
              replies: res.content,
            },
          })
        } else {
          console.error("error apiService.getCommentsReplies", res)
          return res
        }
      })
  }
}

const showComments = (publicationId) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_COMMENTS_ACTION,
      payload: { publicationId },
    })
  }
}

const closeComments = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_COMMENTS_ACTION,
    })
  }
}

const showReplies = (publicationId, commentId) => {
  return (dispatch) => {
    dispatch({
      type: SHOW_REPLIES_ACTION,
      payload: { publicationId, commentId },
    })
  }
}

const closeReplies = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_REPLIES_ACTION,
    })
  }
}

const setActiveComment = (comment) => {
  return (dispatch) => {
    dispatch({
      type: SET_ACTIVE_COMMENT_ACTION,
      payload: { comment },
    })
  }
}

const setActiveCommentId = (id) => {
  return (dispatch) => {
    dispatch({
      type: SET_ACTIVE_COMMENT_ID_ACTION,
      payload: { id },
    })
  }
}

const closeActiveComment = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_ACTIVE_COMMENT_ACTION,
    })
  }
}

const setTimeAction = (time, timestamp) => {
  const newTimestamp = addTimeToDate(time.format24, timestamp)
  return (dispatch) => {
    dispatch({
      type: SET_TIME_ACTION,
      payload: { newTimestamp },
    })
  }
}

const setDateAction = (date) => {
  const timestamp = date.getTime() / 1000
  return (dispatch) => {
    dispatch({
      type: SET_DATE_ACTION,
      payload: { timestamp },
    })
  }
}

const addNewPublication = (user) => {
  return (dispatch) => {
    dispatch({
      type: ADD_NEW_PUBLICATION_ACTION,
      payload: { user },
    })
  }
}

const blockUser = (id) => {
  return (dispatch) => {
    return apiService
      .putBlockUser(id.authorId, id.delete_comments)
      .then((res) => {
        dispatch({
          type: BLOCK_USER_PUBLICATION_ACTION,
        })
      })
      .then((res) => {
        dispatch(getPublications())
      })
  }
}

const unBlockUser = (id) => {
  return (dispatch) => {
    return apiService.putUnblockUser(id).then((res) => {
      dispatch({
        type: UNBLOCK_USER_PUBLICATION_ACTION,
      })
    })
  }
}

const deleteComment = ({ id, publicationId }) => {
  return (dispatch) => {
    return apiService.deleteComment(id).then((res) => {
      dispatch(getCommentsPublication(publicationId))
      dispatch({
        type: DELETE_COMMENT_PUBLICATION_ACTION,
      })
    })
  }
}

const deleteRepliesComment = ({ id, publicationId }) => {
  return (dispatch) => {
    return apiService.deleteComment(id).then((res) => {
      dispatch(getCommentsPublication(publicationId))
    })
  }
}

export {
  getPublications,
  selectPublication,
  toggleSelectPublication,
  deletePublication,
  savePublication,
  publicationSetFile,
  publicationHandleInput,
  getCommentsPublication,
  getCommentsReplies,
  showComments,
  closeComments,
  showReplies,
  closeReplies,
  setActiveComment,
  setActiveCommentId,
  closeActiveComment,
  setTimeAction,
  setDateAction,
  addNewPublication,
  blockUser,
  unBlockUser,
  deleteComment,
  deleteRepliesComment,
}

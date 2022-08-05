import {
  ADD_NEW_PUBLICATION_ACTION,
  CLOSE_ACTIVE_COMMENT_ACTION,
  CLOSE_COMMENTS_ACTION,
  CLOSE_REPLIES_ACTION,
  DELETE_COMMENT_PUBLICATION_ACTION,
  GET_COMMENTS_PUBLICATION_BY_ID_ACTION,
  GET_COMMENTS_REPLIES_BY_ID_ACTION,
  GET_PUBLICATIONS_ACTION,
  HANDLE_INPUT_PUBLICATIONS_ACTION,
  SELECT_PUBLICATIONS_ACTION,
  SET_ACTIVE_COMMENT_ACTION,
  SET_ACTIVE_COMMENT_ID_ACTION,
  SET_DATE_ACTION,
  SET_FILE_PUBLICATIONS_ACTION,
  SET_TIME_ACTION,
  SHOW_COMMENTS_ACTION,
  SHOW_REPLIES_ACTION,
  TOGGLE_SELECT_PUBLICATIONS_ACTION,
} from "../actions/publication"

let initialState = {
  publications: [],
  activePublicationIdx: null,
  publicationChanges: null,
  publicationId: null,
  isShowComments: false,
  isShowReplies: false,
  comments: [],
  replies: [],
  activeComment: null,
  activeCommentId: null,
}

const publication = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PUBLICATIONS_ACTION:
      return {
        ...state,
        publications: payload.publications,
      }

    case SELECT_PUBLICATIONS_ACTION:
      return {
        ...state,
        activePublicationIdx: payload.idx,
        publicationChanges: null,
        publicationId: null,
        isShowComments: false,
        comments: [],
      }

    case TOGGLE_SELECT_PUBLICATIONS_ACTION:
      return {
        ...state,
        ...initialState,
      }
    case SET_FILE_PUBLICATIONS_ACTION:
      return {
        ...state,
        publicationChanges: {
          ...state.publicationChanges,
          image_url: payload.fileImg.localImageUrl,
          raw: payload.fileImg.raw,
        },
      }
    case HANDLE_INPUT_PUBLICATIONS_ACTION:
      return {
        ...state,
        publicationChanges: {
          ...state.publicationChanges,
          ...payload.publication,
        },
      }

    case GET_COMMENTS_PUBLICATION_BY_ID_ACTION:
      return {
        ...state,
        comments: payload.comments,
      }
    case GET_COMMENTS_REPLIES_BY_ID_ACTION:
      return {
        ...state,
        replies: payload.replies,
      }

    case SHOW_COMMENTS_ACTION:
      return {
        ...state,
        publicationId: payload.publicationId,
        isShowComments: true,
      }
    case CLOSE_REPLIES_ACTION:
      return {
        ...state,
        publicationId: null,
        commentId: null,
        isShowReplies: false,
        activeComment: null,
      }
    case SHOW_REPLIES_ACTION:
      return {
        ...state,
        publicationId: payload.publicationId,
        commentId: payload.commentId,
        isShowReplies: true,
      }
    case CLOSE_COMMENTS_ACTION:
      return {
        ...state,
        publicationId: null,
        isShowComments: false,
        activeComment: null,
      }

    case SET_ACTIVE_COMMENT_ACTION:
      return {
        ...state,
        activeComment: payload.comment,
      }
    case SET_ACTIVE_COMMENT_ID_ACTION:
      return {
        ...state,
        activeCommentId: payload.id,
      }
    case CLOSE_ACTIVE_COMMENT_ACTION:
      return {
        ...state,
        activeComment: null,
      }

    case SET_TIME_ACTION:
      return {
        ...state,
        publicationChanges: {
          ...state.publicationChanges,
          posted_at: payload.newTimestamp,
        },
      }
    case SET_DATE_ACTION:
      return {
        ...state,
        publicationChanges: {
          ...state.publicationChanges,
          posted_at: payload.timestamp,
        },
      }

    case ADD_NEW_PUBLICATION_ACTION:
      return {
        ...state,
        activePublicationIdx: state.publications.length,
        publicationChanges: {
          id: null,
          created_by: payload.user,
          full_text: "",
          poll_enabled: false,
          posted_at: (Date.now() / 1000) | 0,
        },
      }

    case DELETE_COMMENT_PUBLICATION_ACTION:
      return {
        ...state,
        activeCommentId: null,
      }

    default:
      return state
  }
}

export default publication

import { connect } from "react-redux"
import PublicationsDetailsComments from "./publicationsDetailsComments"
import {
  blockUser,
  closeComments,
  closeReplies,
  deleteComment,
  getCommentsPublication,
  setActiveComment,
  setActiveCommentId,
} from "../../../actions/publication"
import { showMessageConfirm } from "../../../actions/messageConfirm"
import {
  CONFIRM_REMOVE_COMMENT,
  CONFIRM_BLOCK_USER_AND_COMMENTS,
} from "../../../services/messagesConfig"

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.publication.comments,
    publicationId: state.publication.publicationId,
    activeComment: state.publication.activeComment,
    activeCommentId: state.publication.activeCommentId,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCommentsPublication: (publicationId) =>
      getCommentsPublication(publicationId)(dispatch),
    closeComments: () => closeComments()(dispatch),
    closeReplies: () => closeReplies()(dispatch),
    setActiveComment: (comment) => setActiveComment(comment)(dispatch),
    setActiveCommentId: (id) => setActiveCommentId(id)(dispatch),
    blockUser: (id, delete_comments) =>
      showMessageConfirm(
        CONFIRM_BLOCK_USER_AND_COMMENTS,
        blockUser,
        id,
        delete_comments
      )(dispatch),
    deleteComment: (options) =>
      showMessageConfirm(
        CONFIRM_REMOVE_COMMENT,
        deleteComment,
        options
      )(dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicationsDetailsComments)

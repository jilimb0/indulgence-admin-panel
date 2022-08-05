import { connect } from "react-redux"
import Replies from "./replies"
import {
  blockUser,
  deleteRepliesComment,
  getCommentsReplies,
  closeReplies,
} from "../../../actions/publication"
import { showMessageConfirm } from "../../../actions/messageConfirm"
import {
  CONFIRM_BLOCK_USER,
  CONFIRM_REMOVE_COMMENT,
} from "../../../services/messagesConfig"

const mapStateToProps = (state, ownProps) => {
  return {
    publicationId: state.publication.publicationId,
    replies: state.publication.replies,
    activeCommentId: state.publication.activeCommentId,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeReplies: () => closeReplies()(dispatch),
    blockUser: (id) =>
      showMessageConfirm(CONFIRM_BLOCK_USER, blockUser, id)(dispatch),
    deleteRepliesComment: (options) =>
      showMessageConfirm(
        CONFIRM_REMOVE_COMMENT,
        deleteRepliesComment,
        options
      )(dispatch),
    getCommentsReplies: (publicationId, commentId) =>
      getCommentsReplies(publicationId, commentId)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Replies)

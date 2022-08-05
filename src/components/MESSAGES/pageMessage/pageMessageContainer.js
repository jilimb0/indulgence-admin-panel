import { connect } from "react-redux"
import PageMessage from "./pageMessage"
import { showMessageConfirm } from "../../../actions/messageConfirm"
import {
  CONFIRM_REMOVE_MESSAGE,
  // CONFIRM_SAVE_CHANGES,
  SEND_PUBLICATION,
} from "../../../services/messagesConfig"
import {
  deleteMessage,
  getMessage,
  moveToPost,
  // saveMessage,
  selectMessage,
  toggleSelectMessage,
} from "../../../actions/message"
import { getProfile } from "../../../actions/userLogin"

const mapStateToProps = (state, ownProps) => {
  return {
    messages: state.message.messages,
    activeMessageIdx: state.message.activeMessageIdx,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessage: () => getMessage()(dispatch),
    selectMessage: (idx) => selectMessage(idx)(dispatch),
    toggleSelectMessage: () => toggleSelectMessage()(dispatch),
    deleteMessage: (id) =>
      showMessageConfirm(CONFIRM_REMOVE_MESSAGE, deleteMessage, id)(dispatch),
    getProfile: () => getProfile()(dispatch),
    moveToPost: (id) =>
      showMessageConfirm(SEND_PUBLICATION, moveToPost, id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageMessage)

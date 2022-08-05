import { connect } from "react-redux"
import PagePublication from "./pagePublication"
import { showMessageConfirm } from "../../../actions/messageConfirm"
import {
  CONFIRM_REMOVE_PUBLICATION,
  CONFIRM_SAVE_CHANGES,
} from "../../../services/messagesConfig"
import {
  addNewPublication,
  deletePublication,
  getPublications,
  publicationHandleInput,
  publicationSetFile,
  savePublication,
  selectPublication,
  setDateAction,
  setTimeAction,
  showComments,
  showReplies,
  toggleSelectPublication,
} from "../../../actions/publication"
import { getProfile } from "../../../actions/userLogin"

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userLogin.user,
    publications: state.publication.publications,
    publicationChanges: state.publication.publicationChanges,
    activePublicationIdx: state.publication.activePublicationIdx,
    isShowComments: state.publication.isShowComments,
    isShowReplies: state.publication.isShowReplies,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPublications: () => getPublications()(dispatch),
    selectPublication: (idx) => selectPublication(idx)(dispatch),
    toggleSelectPublication: () => toggleSelectPublication()(dispatch),
    publicationSetFile: (e) => publicationSetFile(e)(dispatch),
    publicationHandleInput: (e) => publicationHandleInput(e)(dispatch),
    deletePublication: (id) =>
      showMessageConfirm(
        CONFIRM_REMOVE_PUBLICATION,
        deletePublication,
        id
      )(dispatch),
    savePublication: (publication) =>
      showMessageConfirm(
        CONFIRM_SAVE_CHANGES,
        savePublication,
        publication
      )(dispatch),
    getProfile: () => getProfile()(dispatch),
    showComments: (publicationId) => showComments(publicationId)(dispatch),
    showReplies: (publicationId, activeCommentId) =>
      showReplies(publicationId, activeCommentId)(dispatch),
    setTimeAction: (time, timestamp) =>
      setTimeAction(time, timestamp)(dispatch),
    setDateAction: (date) => setDateAction(date)(dispatch),
    addNewPublication: (user) => addNewPublication(user)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PagePublication)

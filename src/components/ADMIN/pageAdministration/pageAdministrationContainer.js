import { connect } from "react-redux"
import PageAdministration from "./pageAdministration"
import {
  addNewAdmin,
  adminHandleBlur,
  adminHandleInput,
  adminHandleSelect,
  adminSetFile,
  deleteAdmin,
  getAdmins,
  putAdmin,
  selectAdminUser,
  toggleSelectAdminUser,
} from "../../../actions/administration"
import { blockUser, unBlockUser } from "../../../actions/publication"
import { getProfile } from "../../../actions/userLogin"
import { showMessageConfirm } from "../../../actions/messageConfirm"
import {
  CONFIRM_REMOVE_ADMIN,
  CONFIRM_SAVE_CHANGES,
  CONFIRM_UNBLOCK_USER,
  CONFIRM_BLOCK_USER,
} from "../../../services/messagesConfig"

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.administration.users,
    userChanges: state.administration.userChanges,
    userErrors: state.administration.userErrors,
    activeUserIdx: state.administration.activeUserIdx,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectAdminUser: (idx) => selectAdminUser(idx)(dispatch),
    toggleSelectAdminUser: () => toggleSelectAdminUser()(dispatch),
    putAdmin: (user, oldUser) =>
      showMessageConfirm(CONFIRM_SAVE_CHANGES, putAdmin, { user, oldUser })(
        dispatch
      ),
    deleteAdmin: (id) =>
      showMessageConfirm(CONFIRM_REMOVE_ADMIN, deleteAdmin, id)(dispatch),
    adminHandleInput: (e) => adminHandleInput(e)(dispatch),
    adminHandleBlur: (e) => adminHandleBlur(e)(dispatch),
    adminHandleSelect: (options) => adminHandleSelect(options)(dispatch),
    adminSetFile: (e) => adminSetFile(e)(dispatch),
    addNewAdmin: () => addNewAdmin()(dispatch),
    getAdmins: () => getAdmins()(dispatch),
    getProfile: () => getProfile()(dispatch),
    unBlockUser: (id) =>
      showMessageConfirm(CONFIRM_UNBLOCK_USER, unBlockUser, id)(dispatch),
    blockUser: (id) =>
      showMessageConfirm(CONFIRM_BLOCK_USER, blockUser, id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageAdministration)

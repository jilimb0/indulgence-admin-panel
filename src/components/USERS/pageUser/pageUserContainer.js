import { connect } from "react-redux"
import PageUser from "./pageUser"
import {
  getUsers,
  handleBlur,
  handleInput,
  handleSelect,
  selectUser,
  toggleSelectUser,
  userSetFile,
  putUser,
  blockUser,
  unBlockUser,
  deleteUser,
} from "../../../actions/user"
import { showMessageConfirm } from "../../../actions/messageConfirm"
import {
  CONFIRM_SAVE_CHANGES,
  CONFIRM_UNBLOCK_USER,
  CONFIRM_BLOCK_USER,
  CONFIRM_REMOVE_USER,
} from "../../../services/messagesConfig"
import { getProfile } from "../../../actions/userLogin"

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.user.users,
    userChanges: state.user.userChanges,
    userErrors: state.user.userErrors,
    activeUserIdx: state.user.activeUserIdx,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => getUsers()(dispatch),
    selectUser: (idx) => selectUser(idx)(dispatch),
    handleInput: (e) => handleInput(e)(dispatch),
    handleBlur: (e) => handleBlur(e)(dispatch),
    handleSelect: (options) => handleSelect(options)(dispatch),
    userSetFile: (e) => userSetFile(e)(dispatch),
    toggleSelectUser: () => toggleSelectUser()(dispatch),
    putUser: (user) =>
      showMessageConfirm(CONFIRM_SAVE_CHANGES, putUser, user)(dispatch),
    getProfile: () => getProfile()(dispatch),
    blockUser: (id) =>
      showMessageConfirm(CONFIRM_BLOCK_USER, blockUser, id)(dispatch),
    unBlockUser: (id) =>
      showMessageConfirm(CONFIRM_UNBLOCK_USER, unBlockUser, id)(dispatch),
    deleteUser: (id) =>
      showMessageConfirm(CONFIRM_REMOVE_USER, deleteUser, id)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageUser)

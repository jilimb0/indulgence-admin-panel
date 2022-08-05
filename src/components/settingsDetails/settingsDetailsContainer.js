import { connect } from "react-redux"
import SettingsDetails from "./settingsDetails"

import {
  saveUser,
  settingsHandleBlur,
  settingsHandleInput,
  settingsSetFile,
  toggleSelectsSettings,
  updatePass,
} from "../../actions/settings"
import { getProfile } from "../../actions/userLogin"
import { showMessageConfirm } from "../../actions/messageConfirm"
import {
  CONFIRM_DISCARD_CHANGES,
  CONFIRM_SAVE_CHANGES,
} from "../../services/messagesConfig"

const mapStateToProps = (state, ownProps) => {
  return {
    self: state.userLogin.user,
    changeSelf: state.settings.changeSelf,
    errors: state.settings.errors,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSelectsSettings: () =>
      showMessageConfirm(
        CONFIRM_DISCARD_CHANGES,
        toggleSelectsSettings
      )(dispatch),
    saveUser: (user) =>
      showMessageConfirm(CONFIRM_SAVE_CHANGES, saveUser, user)(dispatch),
    handleInput: (e) => settingsHandleInput(e)(dispatch),
    handleBlur: (e) => settingsHandleBlur(e)(dispatch),
    setFile: (e) => settingsSetFile(e)(dispatch),
    getProfile: () => getProfile()(dispatch),
    updatePass: (oldPass, newPass) => showMessageConfirm(CONFIRM_SAVE_CHANGES, updatePass, {oldPass, newPass})(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDetails)

import { connect } from "react-redux"
import MessageConfirm from "./messageConfirm"
import { onCancel, onConfirm, onCheck } from "../../actions/messageConfirm"

const mapStateToProps = (state, ownProps) => {
  return {
    show: state.messageConfirm.show,
    msg: state.messageConfirm.msg,
    pendingAction: state.messageConfirm.pendingAction,
    options: state.messageConfirm.options,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCancel: () => onCancel()(dispatch),
    onCheck: (action, id, delete_comments) =>
      onCheck(action, id, delete_comments)(dispatch),
    onConfirm: (action, options) => onConfirm(action, options)(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageConfirm)

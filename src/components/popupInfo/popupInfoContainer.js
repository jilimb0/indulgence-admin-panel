import { connect } from 'react-redux';
import PopupInfo from "./popupInfo";
import {onClosePopupInfo} from "../../actions/popups";

const mapStateToProps = (state, ownProps) => {
    return {
        show: state.popups.popupInfo.show,
        msg: state.popups.popupInfo.msg,
        ...ownProps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClose: () => onClosePopupInfo()(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupInfo);
import { connect } from 'react-redux';
import Navigation from './navigation';
import {logout} from '../../actions/userLogin';
import {showMessageConfirm} from "../../actions/messageConfirm";
import {CONFIRM_EXIT} from "../../services/messagesConfig";

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.userLogin.user,
        ...ownProps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => showMessageConfirm(CONFIRM_EXIT, logout)(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
import { connect } from 'react-redux';
import Login from './login';
import {authorize, handleInputPopup, sendPassRepair} from '../../actions/userLogin';

const mapStateToProps = (state, ownProps) => {
    return {
        showPopupRepair: state.userLogin.popupRepair.show,
        inputValue: state.userLogin.popupRepair.inputValue,
        ...ownProps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authorize: (login, password) => authorize(login, password)(dispatch),
        handleInputPopup: (e) => handleInputPopup(e)(dispatch),
        sendPassRepair: (email) => sendPassRepair(email)(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
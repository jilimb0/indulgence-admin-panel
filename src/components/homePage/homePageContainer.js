import { connect } from 'react-redux';
import HomePage from './homePage';
import { getProfile } from '../../actions/userLogin';

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.userLogin.user,
        ...ownProps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProfile: function() {
            return getProfile()(dispatch);
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
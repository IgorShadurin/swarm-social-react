import React, {Component, Fragment} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './UserInfo.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
import PropTypes from "prop-types";
import User from "../../Beefree/User";

class UserInfo extends Component {
    render() {
        const {getUser} = this.props;
        return (
            <Fragment>
                <p>
                    USER INFO HERE

                </p>
                <p>
                    {this.props.user ? <span>{this.props.user.first_name}</span> : 'User is EMPTY'}
                </p>
                <button onClick={() => {
                    getUser('313d969dd48af23991c09fe0fa549f39779caeeaa41f73229bf63e9a0538f9b2');
                    //this.props.getUser();
                }}>GET USER NOW
                </button>

            </Fragment>
        );
    }
}

UserInfo.propTypes = {
    user: PropTypes.instanceOf(User),
    getUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    //count: state.getIn(['count']),
    //user: state.getIn(['social', 'user'])
    user: state.social.user
});

/*const mapDispatchToProps = dispatch => ({
    getUser: (hash) => dispatch(getUser(hash)),
});*/

export default connect(mapStateToProps, actions)(UserInfo);

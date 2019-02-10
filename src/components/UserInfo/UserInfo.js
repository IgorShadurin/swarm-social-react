import React, {Component, Fragment} from 'react';
import './UserInfo.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
import PropTypes from "prop-types";

class UserInfo extends Component {
    render() {

        const {getProfile, getMyProfile, user, saveMyProfile} = this.props;

        return (
            <Fragment>
                <p>
                    USER INFO HERE

                </p>

                {this.props.user ?
                    <Fragment>
                        <p>First name: {user.first_name}</p>
                        <p>Last name: {user.last_name}</p>
                        <p>Birth date: {user.birth_date}</p>
                        <p>Location: {user.location.name}</p>
                        <p>
                            <img src={user.photo.original} alt=""/>
                        </p>
                        <p>About: {user.about}</p>
                    </Fragment>
                    : <p>User is EMPTY</p>}

                <button onClick={() => {
                    getProfile('313d969dd48af23991c09fe0fa549f39779caeeaa41f73229bf63e9a0538f9b2');

                }}>GET USER NOW
                </button>

                <button onClick={() => {
                    getMyProfile();

                }}>Get current user
                </button>

                <button onClick={() => {
                    saveMyProfile({first_name: 'wowowo lolo lll'});
                }}>
                    Save user now
                </button>

            </Fragment>
        );
    }
}

UserInfo.propTypes = {
    user: PropTypes.object,
    getProfile: PropTypes.func.isRequired,
    getMyProfile: PropTypes.func.isRequired,
    saveMyProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.social.user
});

export default connect(mapStateToProps, actions)(UserInfo);

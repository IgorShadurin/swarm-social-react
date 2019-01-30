import React, {Component, Fragment} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './UserInfo.css';
import {connect} from "react-redux";
import {getUser} from "../../store/social/actions";
import PropTypes from "prop-types";

class UserInfo extends Component {
    render() {
        return (
            <Fragment>
                <p>
                    USER INFO HERE

                </p>
                <p>
                    {this.props.user ? <span>{this.props.user.first_name}</span> : 'User is EMPTY'}
                </p>
                <button onClick={this.props.getUser}>GET USER NOW</button>

            </Fragment>
        );
    }
}

UserInfo.propTypes = {
    user: PropTypes.shape({
        first_name: PropTypes.string
    }),
    getUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    //count: state.getIn(['count']),
    //user: state.getIn(['social', 'user'])
    user: state.social.user
});

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

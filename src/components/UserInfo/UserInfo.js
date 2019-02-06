import React, {Component, Fragment} from 'react';
import './UserInfo.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
import PropTypes from "prop-types";
//import User from "../../Beefree/User";

class UserInfo extends Component {
    // todo because dispatching - all classes converts to objects
    // todo display data only from objects or convert some ways object to class obj
    // todo or use mapStateToProps or middleware to convert??
    // todo or before class creation just validate object and after dispatching convert to object
    /*componentDidUpdate(prevProps) {
        console.log(prevProps.user,this.props.user);
        if (this.props.user == prevProps.user) {
            console.log('Equal');
        } else {
            console.log('Not equal');
        }
    }*/

    render() {
        //console.log(User.fromObject({first_name:"hello"}));

        const {getUser, user} = this.props;
        //console.log(user);
        return (
            <Fragment>
                <p>
                    USER INFO HERE

                </p>
                <p>
                    {this.props.user ?
                        <span>{user.first_name}</span> : 'User is EMPTY'}
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
    //user: PropTypes.instanceOf(User),
    user: PropTypes.object,
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

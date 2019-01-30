import React, {Component, Fragment} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux'
import './UserPage.css';
//import PropTypes from 'prop-types'
import UserStorage from "../../UserStorage";
import UserFollowings from "../../UserFollowings";
import UserWallet from "../../UserWallet";
import WallPost from "../../WallPost";
import WallCreatePost from "../../WallCreatePost";
import UserInfo from "../../UserInfo";
import Wall from "../../Wall";

//import {getUser} from '../../../store/social/actions'

class UserPage extends Component {
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div className="col-sm-12 App-block-border">
                        <UserInfo/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-5">
                        <div className="App-block-border">
                            <UserStorage/>
                        </div>
                        <div className="App-block-border">
                            <UserFollowings/>
                        </div>
                        <div className="App-block-border">
                            <UserWallet/>
                        </div>
                    </div>
                    <div className="col-sm-1"/>
                    <div className="col-sm-5">
                        <Wall/>
                    </div>
                </div>
            </Fragment>
        );
    }
}

/*UserPage.propTypes = {
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
});*/

//export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
export default connect()(UserPage)

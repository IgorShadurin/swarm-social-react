import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './UserPage.css';

import UserStorage from "../../UserStorage";
import UserFollowings from "../../UserFollowings";
import UserWallet from "../../UserWallet";
import WallPost from "../../WallPost";
import WallCreatePost from "../../WallCreatePost";
import UserInfo from "../../UserInfo";
import {Link} from "react-router-dom";

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
                        <WallCreatePost/>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => <WallPost item={item}/>)}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default UserPage;
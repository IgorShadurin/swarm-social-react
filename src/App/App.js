import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.min';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faWallet, faComment, faCog} from '@fortawesome/free-solid-svg-icons';

import Navigation from "../components/Navigation";
import UserInfo from "../components/UserInfo";
import UserStorage from "../components/UserStorage/UserStorage";
import UserFollowings from "../components/UserFollowings/UserFollowings";
import UserWallet from "../components/UserWallet/UserWallet";
import WallPost from "../components/WallPost/WallPost";

library.add(faComment, faWallet, faCog);

class App extends Component {

    render() {
        return (
            <div className="App">
                <Navigation/>
                <div className="App-content">
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
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => <WallPost/>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

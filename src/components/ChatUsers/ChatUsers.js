import React, {Component} from 'react';
import './ChatUsers.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
import User from "../../Beefree/User";

class ChatUsers extends Component {

    onAddUser=()=>{};

    render() {
        const iFollow = this.props.user && this.props.user.i_follow ? this.props.user.i_follow : [];
        const users = iFollow.map((item, index) => (
            (
                <div key={index} className="item">
                    <div className="container">
                        <div className="row">
                            <div className="col-9">
                                <div className="l-bar">
                                    <div className="avatar-wrap">
                                        <img src={User.getAvatar(item)} alt=""/>
                                    </div>
                                    <div className="nickname-wrap">
                                        <p>
                                            <span className="following-username" onClick={this.onUsernameClick}>
                                                @{item.username}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="followers">
                                    <div className="ammount-wrap">
                                        <span>{User.getNotifications(item)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        ));

        return (
            <div className="follows-block _block">
                <div className="header-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="block-name">
                                    <p>
                                        <i className="fas fa-users"/>
                                        Users
                                    </p>
                                </div>
                            </div>
                           <div className="col-md-5">
                                <div className="btn-wrap">
                                    <button className="btn btn-beefree" onClick={this.onAddUser}>Add user</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="items-wrap">

                                {users}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.social.user,
});

export default connect(mapStateToProps, actions)(ChatUsers);
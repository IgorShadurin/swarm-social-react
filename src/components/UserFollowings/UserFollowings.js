import React, {Component, Fragment} from 'react';
import './UserFollowings.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
import User from "../../Beefree/User";
//import defaultAvatar from './../../img/user/weave.png'
import defaultAvatar from '../../img/avatar'
import {Link} from "react-router-dom";

class UserFollowings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            message: '',
            currentUserId: 0,
            toUserId: 0,
        };
        this.messagesEnd = null;
        this.lastMessagesCount = 0;
    }

    onChange = (e) => {
        this.setState({
            [e.target.dataset.field]: e.target.value
        });
    };

    onUsernameClick = (e) => {
        e.preventDefault();
    };

    onAddToFriends = () => {
        const {addFriend} = this.props;
        if (this.state.username.length <= 0) {
            alert('Enter user wallet');
            return;
        }

        addFriend(this.state.username);
        alert('Transaction sent! Wait and check your friend list in 10-30 minutes');
    };

    /*onFindByUsername = () => {
        const {findUser} = this.props;
        findUser(this.state.username);
    };*/

    onUserMail = (toUserId) => {
        const {loadMessages, userId} = this.props;
        this.setState({currentUserId: userId, toUserId});
        console.log('from', toUserId, 'to', userId);
        loadMessages(userId, toUserId);
    };

    onSendMessage = () => {
        const {addMessage} = this.props;
        console.log(this.state.toUserId);
        addMessage(this.state.toUserId, this.state.message);
        this.setState({message: ''});
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.lastMessagesCount !== this.props.currentDialogMessages.length) {
            this.lastMessagesCount = this.props.currentDialogMessages.length;
            setTimeout(_ => this.messagesEnd.scrollIntoView({behavior: "smooth"}), 300);
        }
    }

    render() {
        const {isFindUser, findUserError, foundUsers, avatars, iFollow, iFollowWait, currentDialogMessages, messages, username, isSendMessage} = this.props;
        let users = iFollow.map((item, index) => {
                const shortItem = '...' + item.substr(13);
                return (
                    <div key={index} className="item">
                        <div className="container">
                            <div className="row">
                                <div className="col-9">
                                    <div className="l-bar">

                                        <div className="nickname-wrap">
                                            <p>
                                            <span className="following-username">
                                                <Link to={`./${item}`}>{shortItem}</Link>
                                            </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="col-3">
                                    <button className="btn btn-primary-outline"
                                            data-toggle="modal"
                                            data-target="#messagesModal"
                                            onClick={() => this.onUserMail(item.userId)}
                                    >
                                        <i className="fas fa-envelope"/>
                                    </button>
                                    {/*<div className="followers">
                                        <div className="ammount-wrap">
                                            <span>{User.getNotifications(item)}</span>
                                        </div>
                                    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                )
            }
        );

        if (iFollow.length === 0) {
            users = (<div className="container">
                <small className="text-muted">Add friends or be alone</small>
            </div>);
        }

        let foundUsersText = foundUsers.length > 0 ?
            <Fragment>
                <hr/>
                {foundUsers.map((item, index) => {
                    //if (item && item.SwarmHash && item.Username) {
                    if (item && item.Username) {
                        const username = User.getUsername(item.Username);
                        let foundAvatar = avatars.find(item => item.swarmHash.toLowerCase() === item.swarmHash.toLowerCase());
                        const avatar = foundAvatar ? foundAvatar.avatar : defaultAvatar;

                        return (<div key={index}>
                            <img src={avatar} alt="Avatar" className="UserFollowings-avatar"/> <span>{username}</span>
                            <div className="float-right">
                                <button className="btn btn-success"
                                        disabled={iFollowWait.filter(follow => follow === item.userId).length > 0 || iFollow.filter(follow => follow.userId === item.userId).length > 0}
                                        onClick={() => this.onAddToFriends(item.userId)}
                                >
                                    <i className="fas fa-plus"/> Add
                                </button>
                            </div>
                        </div>);
                    } else {
                        return (<p key={index}>User not found</p>);
                    }
                })}
            </Fragment>
            : (<span/>);

        let messagesText = currentDialogMessages.map(item => {
            const recipientInfo = iFollow.find(iFollowItem => messages[item] ? Number(iFollowItem.userId) === Number(messages[item].fromUserId) : false);
            const message = messages[item] ? messages[item].message : '...';
            return <div key={item} className="UserFollowings-message">
                <p style={{marginBottom: 8}}>
                    <small className="text-muted">@{recipientInfo ? recipientInfo.Username : username}</small>
                </p>
                <div className="row">
                    <div className="col-sm-1">
                        <img src={User.getAvatar(item)} style={{maxWidth: 30}} alt="User avatar"/>
                    </div>
                    <div className="col-sm-11">
                        {message}
                    </div>
                </div>
            </div>;
        });

        if (currentDialogMessages.length === 0) {
            messagesText = <p>Write first message!</p>;
        }

        return (
            <Fragment>
                <div className="modal fade bd-example-modal-lg" id="messagesModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Messages <button
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={_ => this.onUserMail(this.state.toUserId)}
                                >Refresh</button></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="UserFollowings-messages">
                                    {messagesText}
                                </div>

                                <div style={{float: "left", clear: "both"}}
                                     ref={(el) => {
                                         this.messagesEnd = el;
                                     }}>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Message"
                                           aria-label="Recipient's username" aria-describedby="button-addon2"
                                           onChange={this.onChange}
                                           data-field="message"
                                           value={this.state.message}
                                    />
                                    <div className="input-group-append">
                                        {isSendMessage && <button className="btn btn-outline-primary"
                                                                  type="button"
                                                                  disabled={true}>
                                           <span className="spinner-border spinner-border-sm" role="status"
                                                 aria-hidden="true"/>
                                            &nbsp;Send...
                                        </button>}

                                        {!isSendMessage && <button className="btn btn-outline-primary"
                                                                   type="button"
                                                                   disabled={this.state.message.length === 0}
                                                                   onClick={this.onSendMessage}>
                                            Send
                                        </button>}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="friendsModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Friends</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {findUserError && <div className="alert alert-danger" role="alert">
                                    {findUserError}
                                </div>}

                                <div className="form-group">
                                    <label>Add by wallet</label>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Wallet"
                                           onChange={this.onChange}
                                           data-field="username"
                                           value={this.state.username}/>
                                </div>

                                <div>
                                    {isFindUser && <button className="btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status"
                                              aria-hidden="true"/>
                                        &nbsp;Find...
                                    </button>}

                                    {!isFindUser && <button className="btn btn-primary"
                                                            disabled={this.state.username.length === 0}
                                                            data-dismiss="modal"
                                                            onClick={this.onAddToFriends}>
                                        Add
                                    </button>}
                                </div>

                                {foundUsersText}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="follows-block _block">
                    <div className="header-wrap">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="block-name">
                                        <p>
                                            <i className="fas fa-user-check"/>
                                            Friends
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="btn-wrap">
                                        <button className="btn btn-beefree"
                                                data-toggle="modal"
                                                data-target="#friendsModal">
                                            <i className="fas fa-plus"/> Add friend
                                        </button>
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
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.social.user,
    foundUsers: state.social.foundUsers,
    findUserError: state.social.findUserError,
    isFindUser: state.social.isFindUser,
    avatars: state.social.avatars,
    iFollow: state.social.iFollow,
    iFollowWait: state.social.iFollowWait,
    userId: state.social.userId,
    currentDialogMessages: state.social.currentDialogMessages,
    messages: state.social.messages,
    username: state.social.username,
    isSendMessage: state.social.isSendMessage,
});

export default connect(mapStateToProps, actions)(UserFollowings);

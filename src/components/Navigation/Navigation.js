import React, {Component} from 'react';
import './Navigation.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import User from "../../Beefree/User";
import * as actions from "../../store/social/actions";
import lovenetLogo from '../../img/user/infinity-lovenet.png'

class Navigation extends Component {
    onSaveToBlockchain = () => {
        const {saveChanges} = this.props;
        saveChanges();
    };

    render() {
        const {user, isAuth, balance, userLogout, isSaveChanges, pageChanged, username, arweave_address} = this.props;
        //console.log(arweave_address);
        //const fullName = User.getFullName(user);
        const fullName = User.getUsername(username);
        const avatar = User.getAvatar(user);
        let isDisableSaveButton = true;

        if (!isSaveChanges) {
            isDisableSaveButton = !pageChanged;
        }

        return (
            <nav>
                {isAuth && <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <Link className="nav-link" to="./">
                                <div className="logo-wrap">
                                    {User.isLovenet() ? (
                                        <span>
                                            <img src={lovenetLogo} alt=""/> lovenet
                                        </span>
                                    ) : 'weavez'}
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-3">
                            <div className="r-bar-wrap">
                                {isSaveChanges && <button className="btn btn-beefree" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status"
                                          aria-hidden="true"/>
                                    &nbsp;Saving to blockchain...
                                </button>}

                                {/*
                                {!isSaveChanges && <button className="btn btn-beefree"
                                                           disabled={isDisableSaveButton}
                                                           onClick={this.onSaveToBlockchain}>
                                    Save to blockchain
                                </button>}
*/}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="r-bar-wrap">
                                <div className="settings-wrap">
                                    {/*<div className="msg _item new">
                                        <Link className="nav-link" to="./dialog">
                                            <i className="fas fa-comment"/>
                                        </Link>
                                    </div>*/}
                                    {/*<div className="wallet _item">
                                        <Link className="nav-link" to="./wallet">
                                            <i className="fas fa-wallet"/>
                                        </Link>
                                    </div>
                                    <div className="sett _item">
                                        <Link className="nav-link" to="./config">
                                            <i className="fas fa-cog"/>
                                        </Link>
                                    </div>*/}
                                </div>
                                <div className="ac-info-wrap">
                                    <div className="info-wrap">
                                        <div className="name">
                                            <p>
                                                {user && fullName}
                                            </p>
                                        </div>
                                        <div className="balance">
                                            <p>
                                                {balance ? `AR ${balance}` : '...'}
                                            </p>
                                            <p>
                                                <a href={`https://viewblock.io/arweave/address/${arweave_address}`}
                                                   target="_blank">{arweave_address}</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="avatar-wrap">
                                        <div className="img-wrap">
                                            <Link className="nav-link" to="./" onClick={userLogout}>
                                                <span>Logout</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </nav>
        );
    }
}

const mapStateToProps = state => ({
    user: state.social.user,
    balance: state.social.balance,
    isSaveChanges: state.social.isSaveChanges,
    pageChanged: state.social.pageChanged,
    username: state.social.username,
    arweave_address: state.social.arweave_address,
});

export default connect(mapStateToProps, actions)(Navigation);

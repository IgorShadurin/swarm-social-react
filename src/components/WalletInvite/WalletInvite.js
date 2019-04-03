import React, {Component} from 'react';
import './WalletInvite.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";

class WalletInvite extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
            privateKey: '',
            walletHash: '',
            walletFilePassword: ''
        };
    }

    inCheckInvite = () => {
        if (this.state.address && this.state.walletFilePassword) {

        } else {
            alert('Empty address or password');
            return;
        }

        const {getSwarmWallet} = this.props;
        getSwarmWallet(this.state.address, this.state.walletFilePassword);
    };

    /*onCheckSwarmHash = () => {
        if (this.state.walletHash && this.state.walletFilePassword) {

        } else {
            alert('Empty hash or password');
            return;
        }

        const {inviteCheckSwarmWallet} = this.props;
        inviteCheckSwarmWallet(this.state.walletHash, this.state.walletFilePassword);
    };*/

    onCreateInvite = () => {
        if (this.state.address && this.state.privateKey) {
            this.onSetAccount();
        } else {
            alert('Empty address or private key');
            return;
        }

        const {createInvite} = this.props;
        createInvite();
    };

    onSetAccount = () => {
        const {inviteSetAccount} = this.props;
        inviteSetAccount(this.state.address, this.state.privateKey);
    };

    onChangeAddress = (e) => {
        this.setState({
            address: e.target.value
        });
    };

    onChangePrivateKey = (e) => {
        this.setState({
            privateKey: e.target.value
        });
    };

    onChangeWalletHash = (e) => {
        this.setState({
            walletHash: e.target.value
        });
    };

    onChangeWalletFilePassword = (e) => {
        this.setState({
            walletFilePassword: e.target.value
        });
    };

    render() {
        const {invites} = this.props;
        const invitesData = invites.map((item, index) => <div key={index}>
            <p>
                Address: {item.address}
            </p>
            <p>
                Password: {item.password}
            </p>
            <p>
                Private key: {item.privateKey}
            </p>
            <p>
                Swarm hash: {item.walletSwarmHash}
            </p>
            <hr/>
        </div>);

        return (
            <div className="follows-block _block">
                <div className="header-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="block-name">
                                    <p>
                                        <i className="fas fa-users"/>
                                        Invites
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="btn-wrap">

                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Address</label>
                            <input className="form-control" aria-describedby="emailHelp"
                                   placeholder="Enter Ethereum Address" onChange={this.onChangeAddress}
                                   value={this.state.address}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Private Key</label>
                            <input type="text" className="form-control" id="exampleInputPassword1"
                                   placeholder="Private Key" onChange={this.onChangePrivateKey}
                                   value={this.state.privateKey}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Wallet file hash</label>
                            <input type="text" className="form-control" id="exampleInputPassword1"
                                   placeholder="Wallet SWARM hash" onChange={this.onChangeWalletHash}
                                   value={this.state.walletHash}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Wallet file password</label>
                            <input type="text" className="form-control" id="exampleInputPassword1"
                                   placeholder="File password" onChange={this.onChangeWalletFilePassword}
                                   value={this.state.walletFilePassword}/>
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={this.onSetAccount}>Set</button>
                        <hr/>

                        {/*<div>
                            <button className="btn btn-beefree" onClick={this.onCheckSwarmHash}>
                                Check SWARM hash
                            </button>
                        </div>*/}

                        <div>
                            <button className="btn btn-beefree" onClick={this.inCheckInvite}>
                                Check Invite
                            </button>
                        </div>

                        <div>
                            <button className="btn btn-beefree" onClick={this.onCreateInvite}>
                                Create invite
                            </button>
                        </div>
                        <hr/>
                        {invitesData}
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="items-wrap">


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
    invites: state.social.invites,
});

export default connect(mapStateToProps, actions)(WalletInvite);
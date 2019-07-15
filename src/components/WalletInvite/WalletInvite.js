import React, {Component} from 'react';
import './WalletInvite.css';
import {connect} from "react-redux";
import * as actions from "../../store/social/actions";
//import InviteWallet from "../../libs/InviteWallet/InviteWallet";

class WalletInvite extends Component {
    constructor() {
        super();
        this.state = {
            address: '',
            privateKey: '',
            walletHash: '',
            walletFilePassword: '',
            inviteBalance: '0.01'
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
        /*if (this.state.address && this.state.privateKey) {
            this.onSetAccount();
        } else {
            alert('Empty address or private key');
            return;
        }*/

        const {createInvite} = this.props;
        createInvite(this.state.inviteBalance);
    };

    /*onSetAccount = () => {
        const {inviteSetAccount} = this.props;
        inviteSetAccount(this.state.address, this.state.privateKey);
    };*/

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

    onChange = (e) => {
        this.setState({
            [e.target.dataset.field]: e.target.value
        });
    };

    render() {
        const {invites, isCreateInvite, createInviteError, createInviteStatus} = this.props;
        const invitesData = invites.map((item, index) => {
            //const url = InviteWallet.createInviteFromData(item.address, item.password);
            const url = '';
            return <div key={index}>
                {/*<p>
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
                </p>*/}
                <p>
                    Invite URL: <a href={url}>{url}</a>
                </p>
                <hr/>
            </div>
        });

        return (
            <div className="follows-block _block">
                <div className="header-wrap">
                    {/*<div className="container">*/}
                    {/*<div className="row">
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

                    {/*<div>
                            <button className="btn btn-beefree" onClick={this.inCheckInvite}>
                                Check Invite
                            </button>
                        </div>*/}

                    <hr/>

                    {createInviteError && <div className="alert alert-danger" role="alert">
                        {createInviteError}
                    </div>}

                    <div className="form-group">
                        <label>Invite balance (ETH)</label>
                        <input type="text"
                               disabled={isCreateInvite}
                               className="form-control"
                               placeholder="Invite balance"
                               onChange={this.onChange}
                               data-field="inviteBalance"
                               value={this.state.inviteBalance}/>
                    </div>

                    <div>
                        {isCreateInvite && <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                            &nbsp;Creating invite...
                        </button>}

                        {!isCreateInvite && <button className="btn btn-primary"
                                                    disabled={isCreateInvite}
                                                    onClick={this.onCreateInvite}>
                            Create invite
                        </button>}
                        {createInviteStatus && <p style={{marginTop: 8}}>{createInviteStatus}</p>}
                    </div>
                    <hr/>
                    {invitesData}
                    {/*</div>*/}
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
    isCreateInvite: state.social.isCreateInvite,
    createInviteError: state.social.createInviteError,
    createInviteStatus: state.social.createInviteStatus,
});

export default connect(mapStateToProps, actions)(WalletInvite);

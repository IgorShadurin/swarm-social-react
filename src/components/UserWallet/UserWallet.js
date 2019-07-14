import React, {Component} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './UserWallet.css';
import avatar from './../../img/423.jpg'
import * as actions from "../../store/social/actions";
import {connect} from "react-redux";
import User from "../../Beefree/User";

class UserWallet extends Component {
    onBtnView = () => {
        console.log('on btn view');
    };

    onUserClick = () => {
        console.log('on user click');
    };

    render() {
        const {user, balance} = this.props;
        const userAvatar = User.getAvatar(user);
        //const balance = '2.89756431';
        //const balanceUsd = '560.86';
        //const dailyIncome = '1.4352426';
        const recentTransactions = [
            {
                type: 'in',
                sumEthereum: '0.12434542',
                sumUsd: '1.12',
                user: {
                    avatar,
                    username: 'user1'
                }
            },
            {
                type: 'in',
                sumEthereum: '0.12434542',
                sumUsd: '1.12',
                user: {
                    avatar,
                    username: 'user2'
                }
            },
            {
                type: 'out',
                sumEthereum: '0.12434542',
                sumUsd: '1.12',
                user: {
                    avatar,
                    username: 'user3'
                }
            },
            {
                type: 'out',
                sumEthereum: '0.12434542',
                sumUsd: '1.12',
                user: {
                    avatar,
                    username: 'user4'
                }
            },
        ];

        const transactions = recentTransactions.map((item, index) => {
            let result = null;
            item.sumEthereum = Number(item.sumEthereum).toFixed(4);
            if (item.type === 'in') {
                result = (
                    <div key={index} className="item transaction">
                        <div className="tr-req">
                            <div className="from cursor-pointer" onClick={this.onUserClick}>
                                <img src={item.user.avatar} alt=""/>
                            </div>
                            <div className="arrow">
                                <i className="fas fa-long-arrow-alt-right"/>
                            </div>
                            <div className="to cursor-pointer" onClick={this.onUserClick}>
                                <img src={userAvatar} alt=""/>
                            </div>
                        </div>
                        <div className="tr-info">
                            <div className="ammount">
                                <p>
                                    <span>+</span>
                                    <span>{item.sumEthereum} ETH</span>
                                    <span className="usd"> (${item.sumUsd})</span>
                                </p>
                            </div>
                            <div className="way">
                                <p>
                                    <span className="dir">from&nbsp;</span>
                                    <span className="user-wallet-recipient cursor-pointer"
                                          onClick={this.onUserClick}>
                                        @{item.user.username}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            } else if (item.type === 'out') {
                result = (
                    <div key={index} className="item transaction">
                        <div className="tr-req">
                            <div className="from cursor-pointer" onClick={this.onUserClick}>
                                <img src={userAvatar} alt=""/>
                            </div>
                            <div className="arrow">
                                <i className="fas fa-long-arrow-alt-right"/>
                            </div>
                            <div className="to cursor-pointer" onClick={this.onUserClick}>
                                <img src={item.user.avatar} alt=""/>
                            </div>
                        </div>
                        <div className="tr-info">
                            <div className="ammount">
                                <p>
                                    <span>-</span>
                                    <span>{item.sumEthereum} ETH</span>
                                    <span className="usd"> (${item.sumUsd})</span>
                                </p>
                            </div>
                            <div className="way">
                                <p>
                                    <span className="dir">sent to&nbsp;</span>
                                    <span className="user-wallet-recipient cursor-pointer"
                                          onClick={this.onUserClick}>
                                        @{item.user.username}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }

            return result;
        });

        return (
            <div className="wallet-block _block">
                <div className="header-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="block-name">
                                    <p>
                                        <i className="fas fa-wallet"/>
                                        My Wallet
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="btn-wrap">
                                    <button className="btn btn-beefree" onClick={this.onBtnView}>View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="items-wrap">

                                    <div className="item">
                                        <div className="item-name">
                                            <p>
                                                Balance
                                            </p>
                                        </div>
                                        <div className="item-content">
                                            <div className="cur-bal">
                                                <p>
                                                    ETH <span>{balance ? balance : '...'}</span>
                                                </p>
                                            </div>
                                            {/*<div className="cur-bal-usd">
                                                <p>
                                                    (${balanceUsd})
                                                </p>
                                            </div>*/}
                                        </div>
                                    </div>

                                    {/*<div className="item">
                                        <div className="item-name">
                                            <p>
                                                Daily income
                                            </p>
                                        </div>
                                        <div className="item-content">
                                            <div className="income">
                                                <p>
                                                    <span className="plus">+</span>&nbsp;ETH&nbsp;
                                                    <span>{dailyIncome}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>*/}

                                    <div className="item transactions">
                                        <div className="item-name">
                                            <p>
                                                Recent transactions
                                            </p>
                                        </div>
                                        <div className="item-content">

                                            {transactions}

                                        </div>
                                    </div>

                                </div>
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
    balance: state.social.balance,
});

export default connect(mapStateToProps, actions)(UserWallet);

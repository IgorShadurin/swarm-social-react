import React, {Component, Fragment} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './UserWallet.css';
import avatar from './../../img/423.jpg'


class UserWallet extends Component {
    render() {
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
                                    <a href="">View</a>
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
                                                    ETH&nbsp;
                                                    <span>
																					2.8975643
																				</span>
                                                </p>
                                            </div>
                                            <div className="cur-bal-usd">
                                                <p>
                                                    ($560,20)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="item-name">
                                            <p>
                                                Daily income
                                            </p>
                                        </div>
                                        <div className="item-content">
                                            <div className="income">
                                                <p>
																				<span className="plus">
																					+
																				</span>
                                                    &nbsp;ETH&nbsp;
                                                    <span>
																					2.8975643
																				</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item transactions">
                                        <div className="item-name">
                                            <p>
                                                Recent transactions
                                            </p>
                                        </div>
                                        <div className="item-content">

                                            <div className="item transaction">
                                                <div className="tr-req">
                                                    <div className="from">
                                                        <img src={avatar} alt=""/>
                                                    </div>
                                                    <div className="arrow">
                                                        <i className="fas fa-long-arrow-alt-right"/>
                                                    </div>
                                                    <div className="to">
                                                        <img src={avatar} alt=""/>
                                                    </div>
                                                </div>
                                                <div className="tr-info">
                                                    <div className="ammount">
                                                        <p>
																						<span>
																							+
																						</span>
                                                            <span>
																							0.2432
																						</span>
                                                            ETH
                                                            <span className="usd">
																							($100)
																						</span>
                                                        </p>
                                                    </div>
                                                    <div className="way">
                                                        <p>
																						<span className="dir">
																							sent to&nbsp;
																						</span>
                                                            <span className="recep">
																							<a href="">
																								@lester.hughes
																							</a>
																						</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="item transaction">
                                                <div className="tr-req">
                                                    <div className="from">
                                                        <img src={avatar} alt=""/>
                                                    </div>
                                                    <div className="arrow">
                                                        <i className="fas fa-long-arrow-alt-right"/>
                                                    </div>
                                                    <div className="to">
                                                        <img src={avatar} alt=""/>
                                                    </div>
                                                </div>
                                                <div className="tr-info">
                                                    <div className="ammount">
                                                        <p>
																						<span>
																							+
																						</span>
                                                            <span>
																							0.2432
																						</span>
                                                            ETH
                                                            <span className="usd">
																							($100)
																						</span>
                                                        </p>
                                                    </div>
                                                    <div className="way">
                                                        <p>
																						<span className="dir">
																							sent to
																						</span>
                                                            <span className="recep">
																							<a href="">
																								@lester.hughes
																							</a>
																						</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="item transaction">
                                                <div className="tr-req">
                                                    <div className="from">
                                                        <img src={avatar} alt=""/>
                                                    </div>
                                                    <div className="arrow">
                                                        <i className="fas fa-long-arrow-alt-right"/>
                                                    </div>
                                                    <div className="to">
                                                        <img src={avatar} alt=""/>
                                                    </div>
                                                </div>
                                                <div className="tr-info">
                                                    <div className="ammount">
                                                        <p>
																						<span>
																							+
																						</span>
                                                            <span>
																							0.2432
																						</span>
                                                            ETH
                                                            <span className="usd">
																							($100)
																						</span>
                                                        </p>
                                                    </div>
                                                    <div className="way">
                                                        <p>
																						<span className="dir">
																							from&nbsp;
																						</span>
                                                            <span className="recep">
																							<a href="">
																								@lester.hughes
																							</a>
																						</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

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

export default UserWallet;
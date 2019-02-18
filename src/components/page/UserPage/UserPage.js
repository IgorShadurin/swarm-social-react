import React, {Component, Fragment} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connect} from 'react-redux'
import './UserPage.css';
//import PropTypes from 'prop-types'
import UserStorage from "../../UserStorage";
import UserFollowings from "../../UserFollowings";
import UserWallet from "../../UserWallet";
//import WallPost from "../../WallPost";
//import WallCreatePost from "../../WallCreatePost";
import UserInfo from "../../UserInfo";
import Wall from "../../Wall";

//import {getUser} from '../../../store/social/actions'
import avatar from '../../../img/423.jpg'


class UserPage extends Component {
    render() {
        return (
            <Fragment>
                {/*<div className="row">
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
                </div>*/}
                <div className="row">
                    <div className="col-lg-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-l-bar-wrap">

                                        <div className="follows-block _block">
                                            <div className="header-wrap">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <div className="block-name">
                                                                <p>
                                                                    <i className="fas fa-user-check"/>
                                                                    Followings
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="btn-wrap">
                                                                <a href="">View all</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content-wrap">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="items-wrap">
                                                            <div className="item">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-9">
                                                                            <div className="l-bar">
                                                                                <div className="avatar-wrap">
                                                                                    <img src={avatar} alt=""/>
                                                                                </div>
                                                                                <div className="nickname-wrap">
                                                                                    <p>
                                                                                        <a href="">
                                                                                            @jeanetta.burke
                                                                                        </a>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-3">
                                                                            <div className="followers">
                                                                                <div className="ammount-wrap">
																					<span>
																						12
																					</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="item">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-md-9">
                                                                            <div className="l-bar">
                                                                                <div className="avatar-wrap">
                                                                                    <img src={avatar} alt=""/>
                                                                                </div>
                                                                                <div className="nickname-wrap">
                                                                                    <p>
                                                                                        <a href="">
                                                                                            @jeanetta.burke
                                                                                        </a>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <div className="followers">
                                                                                <div className="ammount-wrap">
																					<span>
																						12
																					</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="item">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-md-9">
                                                                            <div className="l-bar">
                                                                                <div className="avatar-wrap">
                                                                                    <img src={avatar} alt=""/>
                                                                                </div>
                                                                                <div className="nickname-wrap">
                                                                                    <p>
                                                                                        <a href="">
                                                                                            @jeanetta.burke
                                                                                        </a>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <div className="followers">
                                                                                <div className="ammount-wrap">
																					<span>
																						4
																					</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="item">
                                                                <div className="container">
                                                                    <div className="row">
                                                                        <div className="col-md-9">
                                                                            <div className="l-bar">
                                                                                <div className="avatar-wrap">
                                                                                    <img src={avatar} alt=""/>
                                                                                </div>
                                                                                <div className="nickname-wrap">
                                                                                    <p>
                                                                                        <a href="">
                                                                                            @jeanetta.burke
                                                                                        </a>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <div className="followers">
                                                                                <div className="ammount-wrap">
																					<span>
																						24
																					</span>
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


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
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

const mapStateToProps = state => ({
    user: state.social.user
});

//export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
export default connect(mapStateToProps)(UserPage)
//export default connect()(UserPage)

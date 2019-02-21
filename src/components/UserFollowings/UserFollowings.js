import React, {Component} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './UserFollowings.css';
import avatar from './../../img/423.jpg'

class UserFollowings extends Component {
    render() {
        return (
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
        );
    }
}

export default UserFollowings;
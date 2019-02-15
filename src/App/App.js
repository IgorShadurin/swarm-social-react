import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.min';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';
import logo from '../img/logo.png'
import avatar from '../img/423.jpg'

import {library} from '@fortawesome/fontawesome-svg-core';
import {faWallet, faComment, faCog} from '@fortawesome/free-solid-svg-icons';

import Navigation from "../components/Navigation";
import UserPage from "../components/page/UserPage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../store/social/actions";
import PropTypes from "prop-types";

library.add(faComment, faWallet, faCog);

class App extends Component {
    componentDidMount() {
        this.props.init();
    }

    // todo wtf: pages started from 'set' (SETtings,SETup) not open
    render() {
        return (
            <Fragment>
                <nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="logo-wrap">
                                    <img src={logo} alt="Logo"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="r-bar-wrap">
                                    <div className="settings-wrap">
                                        <div className="msg _item new">
                                            <a href="">
                                                <i className="fas fa-comment"></i>
                                            </a>
                                        </div>
                                        <div className="wallet _item">
                                            <a href="">
                                                <i className="fas fa-wallet"></i>
                                            </a>
                                        </div>
                                        <div className="sett _item">
                                            <a href="">
                                                <i className="fas fa-cog"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="ac-info-wrap">
                                        <div className="info-wrap">
                                            <div className="name">
                                                <p>
                                                    Brandon Hayes
                                                </p>
                                            </div>
                                            <div className="balance">
                                                <p>
                                                    ETH 2.6423
                                                </p>
                                            </div>
                                        </div>
                                        <div className="avatar-wrap">
                                            <div className="img-wrap">
                                                <img src={avatar} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <section id="main-body">
                    <div className="container">
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
																							from
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
                                <div className="container">
                                    <div className="row new-post">
                                        <div className="col-md-2">
                                            <div className="avatar-wrap">
                                                <img src={avatar} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="new-post-field">
                                                <div className="input-field">
                                            <textarea name="" id="" cols="" rows="1"
                                                      placeholder="Create a post..."/>
                                                </div>
                                                <div className="btns-wrap">
                                                    <div className="btns">
                                                        <a href="">
                                                            <i className="fas fa-images"/>
                                                        </a>
                                                        <a href="">
                                                            <i className="fas fa-video"/>
                                                        </a>
                                                        <a href="" className="post">
                                                            Post
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-2"/>
                                        <div className="col-md-10">
                                            <div className="posts-wrap">

                                                <div className="post">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="post-header">
                                                                    <div className="l-side">
                                                                        <div className="avatar-wrap">
                                                                            <img src={avatar} alt=""/>
                                                                        </div>
                                                                        <div className="info-wrap">
                                                                            <a href="">
                                                                                <p className="name">
                                                                                    Brandon Hayes
                                                                                </p>
                                                                                <p className="date">
                                                                                    Yseterday - 13:55
                                                                                </p>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="r-side">
                                                                        <div className="btns-wrap">
                                                                            <a href="">
                                                                                <i className="far fa-edit"></i>
                                                                            </a>
                                                                            <a href="">
                                                                                <i className="far fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="post-content">
                                                                    <p>
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing
                                                                        elit. Iusto aliquid fuga quibusdam sunt nostrum
                                                                        architecto, fugit quasi exercitationem
                                                                        aspernatur
                                                                        temporibus eveniet excepturi illo maxime
                                                                        explicabo autem
                                                                        modi porro alias, inventore.
                                                                    </p>
                                                                </div>
                                                                <div className="post-end">
                                                                    <div className="likes-wrap">
                                                                        <a className="like" href="">
                                                                            <i className="fas fa-thumbs-up"></i>
                                                                            <span>
																		9
																	</span>
                                                                        </a>
                                                                        <a className="dislike" href="">
                                                                            <i className="fas fa-thumbs-down"></i>
                                                                            <span>
																		0
																	</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="share-wrap">
                                                                        <a href="">
                                                                            Share
                                                                            <i className="fas fa-retweet"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="post">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="post-header">
                                                                    <div className="l-side">
                                                                        <div className="avatar-wrap">
                                                                            <img src={avatar} alt=""/>
                                                                        </div>
                                                                        <div className="info-wrap">
                                                                            <a href="">
                                                                                <p className="name">
                                                                                    Brandon Hayes
                                                                                </p>
                                                                                <p className="date">
                                                                                    Yseterday - 13:55
                                                                                </p>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="r-side">
                                                                        <div className="btns-wrap">
                                                                            <a href="">
                                                                                <i className="far fa-edit"></i>
                                                                            </a>
                                                                            <a href="">
                                                                                <i className="fas fa-eye-slash"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="post-content">
                                                                    <img src="img/tmb_232902_600062.jpg" alt=""/>
                                                                    <p>
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing
                                                                        elit.
                                                                    </p>
                                                                </div>
                                                                <div className="post-end">
                                                                    <div className="likes-wrap">
                                                                        <a className="like" href="">
                                                                            <i className="fas fa-thumbs-up"></i>
                                                                            <span>
																		9
																	</span>
                                                                        </a>
                                                                        <a className="dislike" href="">
                                                                            <i className="fas fa-thumbs-down"></i>
                                                                            <span>
																		0
																	</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="share-wrap">
                                                                        <a href="">
                                                                            Share
                                                                            <i className="fas fa-retweet"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="post">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="post-header">
                                                                    <div className="l-side">
                                                                        <div className="avatar-wrap">
                                                                            <img src={avatar} alt=""/>
                                                                        </div>
                                                                        <div className="info-wrap">
                                                                            <a href="">
                                                                                <p className="name">
                                                                                    Brandon Hayes
                                                                                </p>
                                                                                <p className="date">
                                                                                    Yseterday - 13:55
                                                                                </p>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="r-side">
                                                                        <div className="btns-wrap">
                                                                            <a href="">
                                                                                <i className="far fa-edit"></i>
                                                                            </a>
                                                                            <a href="">
                                                                                <i className="far fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="post-content">
                                                                    <p>
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing
                                                                        elit. Iusto aliquid fuga quibusdam sunt nostrum
                                                                        architecto, fugit quasi exercitationem
                                                                        aspernatur
                                                                        temporibus eveniet excepturi illo maxime
                                                                        explicabo autem
                                                                        modi porro alias, inventore.
                                                                    </p>
                                                                </div>
                                                                <div className="post-end">
                                                                    <div className="likes-wrap">
                                                                        <a className="like" href="">
                                                                            <i className="fas fa-thumbs-up"></i>
                                                                            <span>
																		9
																	</span>
                                                                        </a>
                                                                        <a className="dislike" href="">
                                                                            <i className="fas fa-thumbs-down"></i>
                                                                            <span>
																		0
																	</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="share-wrap">
                                                                        <a href="">
                                                                            Share
                                                                            <i className="fas fa-retweet"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="post">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="post-header">
                                                                    <div className="l-side">
                                                                        <div className="avatar-wrap">
                                                                            <img src={avatar} alt=""/>
                                                                        </div>
                                                                        <div className="info-wrap">
                                                                            <a href="">
                                                                                <p className="name">
                                                                                    Brandon Hayes
                                                                                </p>
                                                                                <p className="date">
                                                                                    Yseterday - 13:55
                                                                                </p>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="r-side">
                                                                        <div className="btns-wrap">
                                                                            <a href="">
                                                                                <i className="far fa-edit"></i>
                                                                            </a>
                                                                            <a href="">
                                                                                <i className="far fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="post-content">
                                                                    <iframe width="" height=""
                                                                            src="https://www.youtube.com/embed/EUX6lXTX9zQ"
                                                                            frameBorder="0"
                                                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                                            allowFullScreen></iframe>
                                                                </div>
                                                                <div className="post-end">
                                                                    <div className="likes-wrap">
                                                                        <a className="like" href="">
                                                                            <i className="fas fa-thumbs-up"></i>
                                                                            <span>
																		9
																	</span>
                                                                        </a>
                                                                        <a className="dislike" href="">
                                                                            <i className="fas fa-thumbs-down"></i>
                                                                            <span>
																		0
																	</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="share-wrap">
                                                                        <a href="">
                                                                            Share
                                                                            <i className="fas fa-retweet"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="post">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="post-header">
                                                                    <div className="l-side">
                                                                        <div className="avatar-wrap">
                                                                            <img src={avatar} alt=""/>
                                                                        </div>
                                                                        <div className="info-wrap">
                                                                            <a href="">
                                                                                <p className="name">
                                                                                    Brandon Hayes
                                                                                </p>
                                                                                <p className="date">
                                                                                    Yseterday - 13:55
                                                                                </p>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="r-side">
                                                                        <div className="btns-wrap">
                                                                            <a href="">
                                                                                <i className="far fa-edit"></i>
                                                                            </a>
                                                                            <a href="">
                                                                                <i className="fas fa-eye-slash"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="post-content">
                                                                    <img src="img/1-12.jpg" alt=""/>
                                                                    <p>
                                                                        Lorem ipsum dolor sit amet, consectetur
                                                                        adipisicing
                                                                        elit.
                                                                    </p>
                                                                </div>
                                                                <div className="post-end">
                                                                    <div className="likes-wrap">
                                                                        <a className="like" href="">
                                                                            <i className="fas fa-thumbs-up"></i>
                                                                            <span>
																		9
																	</span>
                                                                        </a>
                                                                        <a className="dislike" href="">
                                                                            <i className="fas fa-thumbs-down"></i>
                                                                            <span>
																		0
																	</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="share-wrap">
                                                                        <a href="">
                                                                            Share
                                                                            <i className="fas fa-retweet"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="post re-post">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="post-header">
                                                                    <div className="l-side">
                                                                        <div className="avatar-wrap">
                                                                            <i className="fas fa-retweet"></i>
                                                                            <img src={avatar} alt=""/>
                                                                        </div>
                                                                        <div className="info-wrap">
                                                                            <a href="">
                                                                                <p className="name">
                                                                                    Brandon Hayes
                                                                                </p>
                                                                                <p className="date">
                                                                                    Yseterday - 13:55
                                                                                </p>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div className="r-side">
                                                                        <div className="btns-wrap">
                                                                            <a href="">
                                                                                <i className="far fa-edit"></i>
                                                                            </a>
                                                                            <a href="">
                                                                                <i className="far fa-eye"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="post-content">
                                                                    <div className="post">
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                <div className="col-md-12">
                                                                                    <div className="post-header">
                                                                                        <div className="l-side">
                                                                                            <div
                                                                                                className="avatar-wrap">
                                                                                                <img src={avatar}
                                                                                                     alt=""/>
                                                                                            </div>
                                                                                            <div className="info-wrap">
                                                                                                <a href="">
                                                                                                    <p className="name">
                                                                                                        Brandon Hayes
                                                                                                    </p>
                                                                                                    <p className="date">
                                                                                                        Yseterday -
                                                                                                        13:55
                                                                                                    </p>
                                                                                                </a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="post-content">
                                                                                        <p>
                                                                                            Lorem ipsum dolor sit amet,
                                                                                            consectetur adipisicing
                                                                                            elit. Iusto
                                                                                            aliquid fuga quibusdam sunt
                                                                                            nostrum
                                                                                            architecto, fugit quasi
                                                                                            exercitationem aspernatur
                                                                                            temporibus
                                                                                            eveniet excepturi illo
                                                                                            maxime
                                                                                            explicabo autem modi porro
                                                                                            alias,
                                                                                            inventore.
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="post-end">
                                                                    <div className="likes-wrap">
                                                                        <a className="like" href="">
                                                                            <i className="fas fa-thumbs-up"></i>
                                                                            <span>
																		9
																	</span>
                                                                        </a>
                                                                        <a className="dislike" href="">
                                                                            <i className="fas fa-thumbs-down"></i>
                                                                            <span>
																		0
																	</span>
                                                                        </a>
                                                                    </div>
                                                                    <div className="share-wrap">
                                                                        <a href="">
                                                                            Share
                                                                            <i className="fas fa-retweet"></i>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="more-btn">
                                                <a href="">show-more</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer>

                </footer>


                <Router>
                    <Fragment>
                        <Navigation/>
                        <Switch>
                            <Route path="/:swarm_protocol?/:swarm_hash?/config/:hash?"
                                   render={() => <h1>Config only</h1>}/>

                            <Route path="/:swarm_protocol?/:swarm_hash?/dialog/:hash?"
                                   render={() => <h1>Dialog only</h1>}/>

                            <Route path="/:swarm_protocol?/:swarm_hash?/wallet/:hash?"
                                   render={() => <h1>Wallet only</h1>}/>

                            <Route exact
                                   path="/:swarm_protocol?/:swarm_hash?/:hash?"
                                   component={UserPage}/>
                        </Switch>
                    </Fragment>
                </Router>
            </Fragment>
        );
    }
}

App.propTypes = {
    init: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    //wallPosts: state.social.wallPosts
});

/*const mapDispatchToProps = dispatch => ({
    init: () => {
        dispatch(init());
        //dispatch(navigateTo({ routeName: 'messagesList' }));
    },
});*/

export default connect(mapStateToProps, actions)(App);
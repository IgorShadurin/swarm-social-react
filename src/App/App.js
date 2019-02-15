import React, {Component, Fragment} from 'react';
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
                        <Router>
                            <Fragment>
                                {/*<Navigation/>*/}
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
                    </div>
                </section>

                <footer>

                </footer>

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
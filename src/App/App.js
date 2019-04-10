import React, {Component, Fragment} from 'react';
import './App.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faWallet, faComment, faCog} from '@fortawesome/free-solid-svg-icons';

import Navigation from "../components/Navigation";
import UserPage from "../components/page/UserPage";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../store/social/actions";
import PropTypes from "prop-types";
import ChatPage from "../components/page/ChatPage";
import WalletPage from "../components/page/WalletPage";
import LoginRegisterPage from "../components/page/LoginRegisterPage";
import ConfigPage from "../components/page/ConfigPage/ConfigPage";
import InviteWallet from "../libs/InviteWallet/InviteWallet";

library.add(faComment, faWallet, faCog);

const auth = {
    isAuthenticated: localStorage.getItem('social_address').length > 0 && localStorage.getItem('social_wallet_hash').length > 0,
    //isAuthenticated: true,
    hash: '',
    check() {
        const address = localStorage.getItem('social_address');
        const walletHash = localStorage.getItem('social_wallet_hash');
        console.log(address, walletHash);
        this.isAuthenticated = address && walletHash;

        return address && walletHash;
    },
    authenticate() {
        this.isAuthenticated = true;

        return new Promise((resolve) => {
            resolve();
        });
    },
    signout() {
        this.isAuthenticated = false;
        return new Promise((resolve) => {
            resolve();
        });
    }
};

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        const {auth} = rest;
        console.log(rest);
        if (props.location.hash) {
            let invite = props.location.hash.replace('#', '');
            try {
                InviteWallet.parseInvite(invite);
                auth.hash = invite;
            } catch (error) {

            }
        }

        return (
            auth.isValid === true
                ? <Component {...props} />
                : <Redirect to={`/${props.match.params.swarm_protocol}/${props.match.params.swarm_hash}/login`}/>
        );
    }}/>
);

class App extends Component {
    constructor() {
        super();
        this.state = {
            isAuth: false
        };
    }

    componentDidMount() {
        this.props.getAuthData();
        this.props.init();
    }

    // todo wtf: pages started from 'set' (SETtings,SETup) not open
    render() {
        // todo check: after implemented PrivateRoute - back button in browser do not work
        const {auth} = this.props;

        return (
            <Router>
                <Fragment>
                    <Navigation isAuth={auth.isValid}/>

                    <section id="main-body">
                        <div className="container">
                            <Switch>
                                <PrivateRoute auth={auth} path="/:swarm_protocol?/:swarm_hash?/config/:hash?"
                                              component={ConfigPage}/>

                                {/*<PrivateRoute auth={auth} path="/:swarm_protocol?/:swarm_hash?/dialog/:hash?"
                                              component={ChatPage}/>*/}

                                <PrivateRoute auth={auth} path="/:swarm_protocol?/:swarm_hash?/wallet/:hash?"
                                              component={WalletPage}/>

                                <Route path="/:swarm_protocol?/:swarm_hash?/login/"
                                       render={(props) => <LoginRegisterPage {...props}
                                           //auth={auth}
                                           //onAuth={() => this.setState({isAuth: true})}
                                                                             redirect={<Redirect
                                                                                 to={`/${props.match.params.swarm_protocol}/${props.match.params.swarm_hash}/`}/>}/>}/>

                                <PrivateRoute auth={auth} exact
                                              path="/:swarm_protocol?/:swarm_hash?/:hash?"
                                              component={UserPage}/>
                            </Switch>
                        </div>
                    </section>

                    <footer>
                    </footer>
                </Fragment>
            </Router>
        );
    }
}

App.propTypes = {
    init: PropTypes.func.isRequired,
    getAuthData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.social.auth
});

/*const mapDispatchToProps = dispatch => ({
    init: () => {
        dispatch(init());
        //dispatch(navigateTo({ routeName: 'messagesList' }));
    },
});*/

export default connect(mapStateToProps, actions)(App);
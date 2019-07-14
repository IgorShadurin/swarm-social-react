import React, {Component, Fragment} from 'react';
import './App.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faCog, faComment, faWallet} from '@fortawesome/free-solid-svg-icons';

import Navigation from "../components/Navigation";
import UserPage from "../components/page/UserPage";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../store/social/actions";
import PropTypes from "prop-types";
import WalletPage from "../components/page/WalletPage";
import LoginRegisterPage from "../components/page/LoginRegisterPage";
import ConfigPage from "../components/page/ConfigPage/ConfigPage";
import InviteWallet from "../libs/InviteWallet/InviteWallet";
import KeyUpload from "../components/Arweave/KeyUpload";
import 'antd/dist/antd.css';

library.add(faComment, faWallet, faCog);

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const {auth} = rest;
        //console.log(rest);


        return (
            auth.isValid
                ? <Component {...props} />
                : <Redirect to={`/login`}/>
        );
    }}/>
);

class App extends Component {
    constructor(props) {
        super(props);
        let invite = '';
        if (window.location.hash) {
            try {
                invite = window.location.hash.replace('#', '');
                InviteWallet.parseInvite(invite);
            } catch (error) {
                invite = '';
            }
        }

        this.state = {
            isAuth: false,
            invite
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
                                {/*<PrivateRoute auth={auth} path="/:swarm_protocol?/:swarm_hash?/config/:hash?"
                                              component={ConfigPage}/>*/}

                                {/*<PrivateRoute auth={auth} path="/:swarm_protocol?/:swarm_hash?/wallet/:hash?"
                                              component={WalletPage}/>*/}

                                <Route path="/login/"
                                       render={(props) => <KeyUpload {...props}
                                                                     auth={auth}
                                                                     invite={this.state.invite}
                                                                     redirect={<Redirect
                                                                         to={`/`}/>}/>}/>

                                <PrivateRoute auth={auth} exact
                                              path="/:hash?"
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

export default connect(mapStateToProps, actions)(App);

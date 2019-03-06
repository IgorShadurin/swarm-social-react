import React, {Component, Fragment} from 'react';
import './App.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faWallet, faComment, faCog} from '@fortawesome/free-solid-svg-icons';

import Navigation from "../components/Navigation";
import UserPage from "../components/page/UserPage";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../store/social/actions";
import PropTypes from "prop-types";
import ChatPage from "../components/page/ChatPage";

library.add(faComment, faWallet, faCog);

class App extends Component {
    componentDidMount() {
        this.props.init();
    }

    // todo wtf: pages started from 'set' (SETtings,SETup) not open
    render() {
        return (
            <Router>
                <Fragment>
                    <Navigation/>

                    <section id="main-body">
                        <div className="container">

                                <Switch>
                                    <Route path="/:swarm_protocol?/:swarm_hash?/config/:hash?"
                                           render={() => <h1>Config only</h1>}/>

                                    <Route path="/:swarm_protocol?/:swarm_hash?/dialog/:hash?"
                                           component={ChatPage}/>

                                    <Route path="/:swarm_protocol?/:swarm_hash?/wallet/:hash?"
                                           render={() => <h1>Wallet only</h1>}/>

                                    <Route exact
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
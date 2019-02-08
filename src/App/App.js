import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.min';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';

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
            <div className="App">
                <div className="App-content">
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
                </div>
            </div>
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
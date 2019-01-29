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

library.add(faComment, faWallet, faCog);


class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-content">
                    <Router>
                        <Fragment>
                            <Navigation/>
                            <Switch>
                                <Route path="/:swarm_protocol?/:swarm_hash?/dialog/:hash?"
                                       render={() => <h1>Dialog only</h1>}/>
                                <Route path="/:swarm_protocol?/:swarm_hash?/wallet/:hash?"
                                       render={() => <h1>Wallet only</h1>}/>
                                <Route path="/:swarm_protocol?/:swarm_hash?/settings/:hash?"
                                       render={() => <h1>Settings only</h1>}/>
                                <Route exact path="/:swarm_protocol?/:swarm_hash?/" component={UserPage}/>
                            </Switch>
                        </Fragment>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;

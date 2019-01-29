import React, {Component, Fragment} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js/dist/popper.min';
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import './App.css';

import {library} from '@fortawesome/fontawesome-svg-core';
import {faWallet, faComment, faCog} from '@fortawesome/free-solid-svg-icons';

import Navigation from "../components/Navigation";
import UserInfo from "../components/UserInfo";
import UserPage from "../components/page/UserPage";
import {BrowserRouter as Router, Route} from 'react-router-dom';


library.add(faComment, faWallet, faCog);


class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-content">
                    <Router>
                        <Fragment>
                            <Navigation/>
                            <Route path="/" component={UserPage} exact/>
                            <Route path="/test" component={UserInfo}/>
                        </Fragment>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;

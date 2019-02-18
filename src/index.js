//import './css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'popper.js/dist/popper.min';
//import 'jquery/dist/jquery.min';
//import 'bootstrap/dist/js/bootstrap.min';
import './css/style.css';
import './css/adaptiv.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore'
import Immutable from "seamless-immutable";

// todo how to optimize default state from here and social reducer
const store = configureStore(Immutable({
    social: {
        user: null,
        wallPosts: Immutable([])
    }
}));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
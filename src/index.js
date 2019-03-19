import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import './css/adaptiv.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore'
import Immutable from "seamless-immutable";

const store = configureStore(Immutable({
    social: {
        user: null,
        wallPosts: Immutable([]),
        isInit: false,
        uploadStatus: Immutable([]),
        isWallPosting: false,
        previews: []
    }
}));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
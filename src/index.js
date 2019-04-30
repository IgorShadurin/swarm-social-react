import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
        userId: null,
        username: null,
        wallPosts: Immutable([]),
        isInit: false,
        uploadStatus: Immutable([]),
        isWallPosting: false,
        isRegistration: false,
        isLogin: false,
        isCreateInvite: false,
        isSaveChanges: false,
        loginError: '',
        registrationError: '',
        createInviteError: '',
        findUserError: '',
        foundUsers: [],
        previews: [],
        avatars: [],
        invites: [],
        iFollow: [],
        iFollowWait: [],
        auth: {
            isValid: false,
            address: '',
            walletHash: '',
            privateKey: ''
        },
        pageChanges: {
            isChanged: false,
            hash: ''
        },
        balance: null,
        messages: {},
        currentDialogMessages: [],
    }
}));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

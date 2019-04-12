import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    social: {
        user: null,
        wallPosts: Immutable([])
    },
});

export default function reduce(state = initialState, action = {}) {
    let posts = null;
    let uploadStatus = null;
    let items = [];
    //console.log(state);
    switch (action.type) {
        case types.SOCIAL_INIT:
            return state.merge({
                isInit: true
            });
        case types.SOCIAL_USER_FETCHED:
            return state.merge({
                user: action.data,
                bee: action.bee
            });
        case types.SOCIAL_WALL_POST_STARTED:
            return state.merge({
                isWallPosting: true,
                uploadStatus: []
            });
        case types.SOCIAL_WALL_POST_CREATED:
            posts = Immutable.asMutable(state.wallPosts);
            posts.unshift(action.data);
            return state.merge({
                wallPosts: Immutable(posts),
                isWallPosting: false
            });
        case types.SOCIAL_WALL_POST_UPDATE_STARTED:
            posts = state.wallPosts.map(item => {
                if (Number(item.id) === Number(action.data.id)) {
                    return action.data;
                } else {
                    return item;
                }
            });

            return state.merge({
                wallPosts: Immutable(posts)
            });
        case types.SOCIAL_WALL_POST_LOADED:
            posts = Immutable.asMutable(state.wallPosts);
            if (action.isAddReversed) {
                posts.push(action.data);
            } else {
                posts.unshift(action.data);
            }

            return state.merge({
                wallPosts: Immutable(posts)
            });
        case types.SOCIAL_WALL_POST_DELETED:
            posts = Immutable.asMutable(state.wallPosts);
            posts = posts.filter(item => item.id !== action.id);
            return state.merge({
                wallPosts: Immutable(posts)
            });
        case types.SOCIAL_PROFILE_SAVED:
            return state.merge({
                user: action.data
            });
        case types.SOCIAL_ON_ADDED_UPLOADING:
            uploadStatus = Immutable.asMutable(state.uploadStatus);
            uploadStatus.push(action.data);
            return state.merge({
                uploadStatus: Immutable(uploadStatus)
            });
        case types.SOCIAL_ON_UPLOADED_USER_FILE:
            uploadStatus = Immutable.asMutable(state.uploadStatus);
            uploadStatus = uploadStatus.map(item => {
                if (item.internal_id === action.internal_id) {
                    const test = Immutable.asMutable(item);
                    test.isComplete = true;
                    test.data = action.data.info;

                    return test;
                }

                return item;
            });
            return state.merge({
                uploadStatus: Immutable(uploadStatus)
            });
        case types.SOCIAL_WALL_POST_IMAGE_PREVIEW_COMPLETE:
            uploadStatus = Immutable.asMutable(state.uploadStatus);
            uploadStatus = uploadStatus.map(item => {
                if (item.internal_id === action.internal_id) {
                    const test = Immutable.asMutable(item);
                    test.previews = action.data;

                    return test;
                }

                return item;
            });
            return state.merge({
                uploadStatus: Immutable(uploadStatus)
            });
        case types.SOCIAL_FILE_PREVIEW_RECEIVED:
            items = Immutable.asMutable(state.previews);
            items.push(action.data);
            return state.merge({
                previews: Immutable(items)
            });
        case types.INVITE_INVITE_CREATED:
            items = Immutable.asMutable(state.invites);
            items.push(action.data);
            return state.merge({
                invites: Immutable(items)
            });
        case types.INVITE_REGISTRATION_STARTED:
            return state.merge({
                isRegistration: true
            });
        case types.INVITE_REGISTRATION_COMPLETE:
            return state.merge({
                isRegistration: false,
                auth: action.data
            });
        case types.INVITE_REGISTRATION_FAILED:
            return state.merge({
                isRegistration: false,
                registrationError: action.data

            });
        case types.INVITE_RECEIVED_STORED_AUTH:
            return state.merge({auth: action.data});
        case types.AUTH_START:
            return state.merge({
                isLogin: true,
                loginError: ''
            });
        case types.AUTH_COMPLETE:
            return state.merge({
                auth: action.data,
                isLogin: false
            });
        case types.AUTH_FAILED:
            return state.merge({
                isLogin: false,
                loginError: action.data
            });
        case types.RECEIVED_BALANCE:
            return state.merge({balance: Number(action.data).toFixed(8)});
        case types.SOCIAL_ON_CHANGE_HASH:
            return state.merge({
                pageChanged: true,
                hash: action.data
            });
        case types.CHANGES_SAVE_START:
            return state.merge({
                isSaveChanges: true
            });
        case types.CHANGES_SAVE_COMPLETE:
            return state.merge({
                isSaveChanges: false,
                pageChanged: true,
            });
        case types.CHANGES_SAVE_FAILED:
            return state.merge({
                isSaveChanges: false,
                pageChanged: true,
            });
        default:
            return state;
    }
}
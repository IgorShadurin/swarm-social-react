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
    switch (action.type) {
        case types.SOCIAL_INIT:
            return state.merge({
                isInit: true
            });
        case types.SOCIAL_USER_FETCHED:
            return state.merge({
                user: action.data
            });
        case types.SOCIAL_WALL_POST_STARTED:
            return state.merge({
                isWallPosting: true
            });
        case types.SOCIAL_WALL_POST_CREATED:
            posts = Immutable.asMutable(state.wallPosts);
            posts.unshift(action.data);
            return state.merge({
                wallPosts: Immutable(posts),
                isWallPosting: false
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
                // todo optimize this section
                if (item.id === action.data.info.id) {
                    const test = Immutable.asMutable(item);
                    test.isComplete = true;

                    return test;
                }

                return item;
            });
            return state.merge({
                uploadStatus: Immutable(uploadStatus)
            });
        default:
            return state;
    }
}

export function getUser(state) {
    return state.social.user;
}

export function getWallPosts(state) {
    return state.social.wallPosts;
}
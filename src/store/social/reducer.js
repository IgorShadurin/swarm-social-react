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
    switch (action.type) {
        case types.SOCIAL_INIT:
            /*return state.merge({
                user: action.data
            });*/
            return state;
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
            posts.unshift(action.data);
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
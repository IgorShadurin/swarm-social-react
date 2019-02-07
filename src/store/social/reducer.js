import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
    social: {
        user: null,
        wallPosts: Immutable([])
    },
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.SOCIAL_USER_FETCHED:
            return state.merge({
                user: action.data
            });
        case types.SOCIAL_WALL_POST_CREATED:
            return state.merge({
                wallPosts: state.wallPosts.concat(action.data)
            });
        case types.SOCIAL_WALL_POST_LOADED:
            return state.merge({
                wallPosts: state.wallPosts.concat(action.data)
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
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
            const posts = state.wallPosts.concat(action.data);
            return state.merge({
                wallPosts: posts
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
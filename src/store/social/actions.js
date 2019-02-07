import * as types from './actionTypes';
import Core from '../../Beefree/Core';

// todo optimize for uploaded to swarm site
const bee = new Core('http://prototype.beefree.me', 'bba12829ba38e978bff9de0f07177fd8f1e124cbdcfb6b3303221dad74a9a5b4');

export const getMyProfile = () => {
    return dispatch => bee.getMyProfile()
        .then(data => {
            return dispatch({
                type: types.SOCIAL_USER_FETCHED,
                data
            });
        });
};

export const getProfile = (hash) => {
    return dispatch => bee.getProfile(hash)
        .then(data => {
            //console.log(data);
            return dispatch({
                type: types.SOCIAL_USER_FETCHED,
                data
            });
        });
};

export const saveMyProfile = (data) => {
    return dispatch => bee.saveMyProfile(data)
        .then(hash => {
            console.log(hash);
            return dispatch({
                type: types.SOCIAL_PROFILE_SAVED,
                hash,
                data
            });
        });
};

export const createWallPost = () => ({
    type: types.SOCIAL_WALL_POST_CREATED,
    data: {
        description: "My new text ",
    },
});

export const loadWallPost = (id, hash) => {
    return dispatch => bee.getPost(id, hash)
        .then(data => {
            console.log(data);
            return dispatch({
                type: types.SOCIAL_WALL_POST_LOADED,
                data
            });
        });
};
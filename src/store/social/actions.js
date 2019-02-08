import * as types from './actionTypes';
import Core from '../../Beefree/Core';

//const parts = window.location.href.split('/').filter(word => word.length === 64 || word.length === 128 || (word.length >= 11 && word.endsWith('.eth')));
const parts = window.location.href.split('/').filter(word => word.length === 64 || word.length === 128);
let currentHash = 'bba12829ba38e978bff9de0f07177fd8f1e124cbdcfb6b3303221dad74a9a5b4';
if (parts.length > 0) {
    currentHash = parts[0];
}

console.log('currentHash', currentHash);
const bee = new Core('http://prototype.beefree.me', currentHash);

export const init = () => {
    return (dispatch) => bee.getMyProfile()
        .then(data => {
            dispatch({
                type: types.SOCIAL_USER_FETCHED,
                data
            });

            return data;
        })
        .then(data => {
            if (data.last_post_id) {
                const displayPosts = Math.min(10, data.last_post_id);
                // todo use promise batch actions? (from lib)
                // todo pre-create posts in correct ways (prevent random displaying)
                /*for (let i = displayPosts; i > 0; i--) {
                    dispatch(getPost(i));
                }*/
                for (let i = 1; i <= displayPosts; i++) {
                    dispatch(getPost(i));
                }
            }
        })
        .then(() => {
            return dispatch({
                type: types.SOCIAL_INIT
            });
        });
};

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
            //console.log(hash);
            return dispatch({
                type: types.SOCIAL_PROFILE_SAVED,
                hash,
                data
            });
        });
};

export const createWallPost = (data) => {
    // todo queue for all "change swarm" queries for correct using (or block ui when change)
    return (dispatch, getState) => {
        bee.createPost(data)
            .then(result => {
                const dispatchData = {
                    type: types.SOCIAL_WALL_POST_CREATED,
                    data: result.data
                };

                return dispatch(dispatchData);
            });
    }
};

export const getPost = (id) => {
    return dispatch => bee.getPost(id)
        .then(data => {
            console.log(data);
            return dispatch({
                type: types.SOCIAL_WALL_POST_LOADED,
                data
            });
        });
};
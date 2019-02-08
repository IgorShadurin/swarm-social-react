import * as types from './actionTypes';
import Core from '../../Beefree/Core';

// todo optimize for uploaded to swarm site
const bee = new Core('http://prototype.beefree.me', 'bba12829ba38e978bff9de0f07177fd8f1e124cbdcfb6b3303221dad74a9a5b4');

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

export const createWallPost = () => {
    return (dispatch, getState) => {
        console.log(getState().social.user);
        let user = getState().social.user;
        user = user.merge({
            last_post_id: user.last_post_id + 1
        });

        dispatch({
            type: types.SOCIAL_USER_FETCHED,
            data: user
        });
        // todo update last post id in user profile
        //saveMyProfile(user);
        const data = {
            type: types.SOCIAL_WALL_POST_CREATED,
            data: {
                id: user.last_post_id,
                description: "My new text ",
            }
        };
        console.log(data);
        return dispatch(data);
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
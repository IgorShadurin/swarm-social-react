import * as types from './actionTypes';
import Social from '../../services/Social';
import Blog from 'free-core/js/Blog';
import SwarmApi from 'free-core/js/SwarmApi';
import BeefreeCore from '../../BeefreeCore/BeefreeCore';

/*const swarm = new SwarmApi('http://prototype.beefree.me');
const blog = new Blog();
blog.swarm = swarm;*/

//const beefree = new BeefreeCore();

export const getUser = (hash) => {
    //return dispatch => blog.getProfile(hash).then(data => console.log(data))
    //return dispatch => Social.getProfileAsync(hash)
    return dispatch => BeefreeCore.getProfile(hash)
        .then(data => (dispatch({
            type: types.SOCIAL_USER_FETCHED,
            data
        })));
};

export const createWallPost = () => ({
    type: types.SOCIAL_WALL_POST_CREATED,
    data: {
        text: "My new text ",
    },
});
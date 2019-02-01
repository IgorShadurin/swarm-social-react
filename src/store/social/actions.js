import * as types from './actionTypes';
import Core from '../../Beefree/Core';

const bee = new Core();
/*bee.getPost(2, '256fc77b82c52c7725d797a7d18bc577503218b732c1aa49465bd0a12c5d1ea3')
    .then(data => console.log(data));*/

export const getUser = (hash) => {
    return dispatch => bee.getUser(hash)
        .then(data => {
            //console.log(data);
            return dispatch({
                type: types.SOCIAL_USER_FETCHED,
                data
            });
        });
};

/*export const getPost = (id, hash) => {
    return dispatch => bee.getPost(id, hash)
        .then(data => (dispatch({
            type: types.SOCIAL_USER_FETCHED,
            data
        })));
};*/

export const createWallPost = () => ({
    type: types.SOCIAL_WALL_POST_CREATED,
    data: {
        text: "My new text ",
    },
});
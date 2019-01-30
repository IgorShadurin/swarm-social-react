import * as types from './actionTypes';

/*export function getUser() {
    return async (dispatch) => {
        dispatch({
            type: types.SOCIAL_USER_FETCHED,
            user: {
                first_name: "Igor",
                last_name: "Sha"
            },
        });
    }
}*/

export const getUser = () => ({
    type: types.SOCIAL_USER_FETCHED,
    data: {
        first_name: "Igor",
        last_name: "Sha"
    },
});

export const createWallPost = () => ({
    type: types.SOCIAL_WALL_POST_CREATED,
    data: {
        text: "My new text ",
    },
});
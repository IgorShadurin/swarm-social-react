import * as types from './actionTypes';
import Core from '../../Beefree/Core';
import Utils from '../../Beefree/Utils';
import Queue from 'promise-queue';
import InviteWallet from "../../libs/InviteWallet/InviteWallet";

const parts = window.location.href.split('/').filter(word => word.length === 64 || word.length === 128);
let currentHash = null;
if (parts.length > 0) {
    currentHash = parts[0];
}

console.log('currentHash', currentHash);
const inviteWallet = new InviteWallet();
//const invite = InviteWallet.randomString(10);
inviteWallet.setAccount('0x9a9065b97198c06da2699cba2f2fd8cd5ad71a04', '9de6181ae32e97fa4b14e8572e29f406b08c056e18934746efc8459274118f9b');
//inviteWallet.setAccount('0xE1a257c02eFECa4375Adeb445d66a8613d006eE8', '9769E601699A29AC99574EB0A21A52E5B7295E195D2BEDD4B7781FB6D1846EA6');
//inviteWallet.register()
/*inviteWallet.ttt().then(data=>{
    console.log(data);
});*/
//inviteWallet.resetWallet('0x9a9065b97198c06da2699cba2f2fd8cd5ad71a04').then(data => console.log(data));
//inviteWallet.createInvite(invite, '0x9a9065b97198c06da2699cba2f2fd8cd5ad71a91', 'wegerg3egge4gw')
/*inviteWallet.createInvite(invite, '0xE1a257c02eFECa4375Adeb445d66a8613d006eE8', 'SWARM_HASH_WITH_KEY_HERE')
    .then(data => console.log(data));*/

/*inviteWallet.setUsername('newadmin')
    .then(data => {
        console.log(data);
        return inviteWallet.createInvite(invite, '0xE1a257c02eFECa4375Adeb445d66a8613d006eE8', 'SWARM_HASH_WITH_KEY_HERE');
    })
    .then(data => {
        console.log(data);
    });*/
//inviteWallet.ttt('etnwtnwrthjjjj').then(data => console.log(data));
/*inviteWallet.createWallet()
    .then((data) => {
        inviteWallet.validate(data.data, data.password)
            .then(privateKey => console.log(privateKey))
            .catch(() => console.log('Incorrect password'));
        return data;
    })
    .then((wallet) => console.log(JSON.stringify(wallet)));*/

let bee = null;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    //bee = new Core('https://swarm-gateways.net', currentHash);
    bee = new Core('http://prototype.beefree.me', currentHash);
    //bee = new Core('https://testeron.pro/swarm-emulator/index.php/', currentHash);
    //bee = new Core('http://127.0.0.1:1111/index.php/', currentHash);
    //bee = new Core('http://127.0.0.1:8500', currentHash);
} else {
    // production code
    bee = new Core(window.location.origin, currentHash);
}

bee.onChangeHash = (hash) => {
    console.log('new hash is: ' + hash);
    //onChangeHash(hash);
};

const queue = new Queue(1, Infinity);

export const init = () => {
    return (dispatch) => bee.getMyProfile()
        .then(data => {
            dispatch({
                type: types.SOCIAL_USER_FETCHED,
                data,
                bee
            });

            return data;
        })
        .then(data => {
            if (data.last_post_id) {
                const lastPostId = data.last_post_id;
                for (let i = 0; i < 10; i++) {
                    const id = lastPostId - i;

                    //console.log('ID: ' + id);
                    if (id <= 0) {
                        break;
                    }

                    queue.add(() => {
                        return getPost(id, true)(dispatch);
                    });
                }

                queue.add(() => {
                    dispatch({
                        type: types.SOCIAL_INIT
                    });
                });
            }
        });
};

export const onChangeHash = (data) => {
    // todo binded to all changes
    return dispatch => dispatch({
        type: types.SOCIAL_ON_CHANGE_HASH,
        data
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
    return dispatch => {
        queue.add(() => {
            bee.saveProfile(data)
                .then(responseData => {
                    console.log(responseData);
                    return dispatch({
                        type: types.SOCIAL_PROFILE_SAVED,
                        hash: responseData.newHash,
                        data: responseData.data
                    });
                });
        });
    }
};

export const createWallPost = (description, attachments) => {
    return (dispatch, getState) => {
        queue.add(() => {
            dispatch({
                type: types.SOCIAL_WALL_POST_STARTED
            });

            return bee.createPost(description, attachments)
                .then(result => {
                    const dispatchData = {
                        type: types.SOCIAL_WALL_POST_CREATED,
                        data: result.data
                    };

                    return dispatch(dispatchData);
                });
        });
    }
};

export const updateWallPost = (id, data) => {
    return (dispatch, getState) => {
        dispatch({
            type: types.SOCIAL_WALL_POST_UPDATE_STARTED,
            data
        });

        queue.add(() => {
            return bee.updatePost(id, data)
                .then(result => {
                    const dispatchData = {
                        type: types.SOCIAL_WALL_POST_UPDATED,
                        data: result.data
                    };

                    return dispatch(dispatchData);
                });
        });
    }
};

export const deleteWallPost = (id) => {
    return (dispatch, getState) => {
        queue.add(() => {
            //console.log('run');
            dispatch({
                type: types.SOCIAL_WALL_POST_DELETING,
                id
            });

            return bee.deletePost(id)
                .then(result => {
                    const dispatchData = {
                        type: types.SOCIAL_WALL_POST_DELETED,
                        data: result.data,
                        id
                    };

                    return dispatch(dispatchData);
                });
        });
    }
};

export const getPost = (id, addReversed = false) => {
    return dispatch => bee.getPost(id)
        .then(data => {
            console.log(data);
            return dispatch({
                type: types.SOCIAL_WALL_POST_LOADED,
                isAddReversed: addReversed,
                data
            });
        })
        .catch(error => dispatch({
            type: types.SOCIAL_WALL_POST_LOADING_FAILED,
            data: error
        }));
};

export const doLike = (contentType, contentId) => {
    return dispatch => dispatch({
        type: types.SOCIAL_ON_CONTENT_LIKE,
        contentType,
        contentId
    });
};

export const doDislike = (contentType, contentId) => {
    return dispatch => dispatch({
        type: types.SOCIAL_ON_CONTENT_DISLIKE,
        contentType,
        contentId
    });
};

export const uploadUserFile = (uploadId, file, fileType) => {
    return dispatch => {
        dispatch({
            type: types.SOCIAL_ON_ADDED_UPLOADING,
            data: {
                internal_id: uploadId,
                name: file.name,
                isComplete: false,
                progressPercent: 10
            }
        });

        queue.add(() => {
            return Utils.resizeImages(file, [
                {
                    width: 100,
                    height: 100
                },
                {
                    width: 300,
                    height: 300
                },
                {
                    width: 800,
                    height: 800
                },
                {
                    width: 1600,
                    height: 1600
                }
            ])
                .then(data => {
                    dispatch({
                        type: types.SOCIAL_WALL_POST_IMAGE_PREVIEW_COMPLETE,
                        internal_id: uploadId,
                        data
                    });

                    return data;
                })
                .then(data => {
                    return bee.uploadUserFile(file, fileType, data)
                })
                .then(data => {
                    //console.log(data);
                    dispatch({
                        type: types.SOCIAL_ON_UPLOADED_USER_FILE,
                        internal_id: uploadId,
                        data
                    });
                });
        });

    }
};

export const getImagePreviewUrl = (fileId, width = 300, height = 300) => {
    return dispatch => {
        dispatch({
            type: types.SOCIAL_FILE_PREVIEW_RECEIVED,
            data: {
                file_id: fileId,
                width,
                height,
                preview: bee.getImagePreviewUrl(fileId, width, height)
            }
        });
    };
};

export const createInvite = () => {
    return dispatch => {
        const invite = InviteWallet.randomString(10);
        let walletData = null;
        dispatch({
            type: types.INVITE_START_CREATION,
            data: {invite}
        });

        return inviteWallet.createWallet()
            .then(data => {
                walletData = data;
                dispatch({
                    type: types.INVITE_WALLET_CREATED,
                    data
                });

                return data;
            })
            .then(data => {
                dispatch({
                    type: types.INVITE_WALLET_UPLOADING_TO_SWARM
                });

                return bee.uploadWallet(JSON.stringify(data.data))
                    .then(hash => {
                        console.log(hash);
                        dispatch({
                            type: types.INVITE_WALLET_UPLOADED_TO_SWARM,
                            data: hash
                        });

                        return hash;
                    });
            })
            .then(hash => {
                if (walletData && walletData.data && walletData.data.address) {

                } else {
                    console.error('Empty wallet data');
                    return;
                }

                dispatch({
                    type: types.INVITE_START_INVITE_TRANSACTION,
                    data: hash
                });

                return inviteWallet.createInvite(invite, walletData.data.address, hash);
            })
            .then(data => {
                dispatch({
                    type: types.INVITE_INVITE_CREATED,
                    data
                });

                return true;
            });
    }
};
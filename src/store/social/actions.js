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
const inviteWallet = new InviteWallet('https://rinkeby.infura.io/v3/357ce0ddb3ef426ba0bc727a3c64c873');

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
    bee.dispatch({
        type: types.SOCIAL_ON_CHANGE_HASH,
        data: hash
    });
};

const queue = new Queue(1, Infinity);

export const init = () => {
    return (dispatch) => {
        bee.setDispatch(dispatch);

        if (!inviteWallet.isAccountExists()) {
            console.error('Account not set');
            return;
        }

        inviteWallet.getHashByAddress(inviteWallet.fromAddress)
            .then((hash) => hash ? bee.setHash(hash) : bee.setHash(currentHash))
            .then(() => bee.getMyProfile())
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
            //console.log(data);
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

export const inviteSetAccount = (wallet, privateKey) => {
    return dispatch => {
        inviteWallet.setAccount(wallet, privateKey);
        dispatch({
            type: types.INVITE_SET_ACCOUNT,
            data: {}
        });

    }
};

export const createInvite = (balance) => {
    return dispatch => {
        const socialAddress = localStorage.getItem('social_address');
        const socialPrivateKey = localStorage.getItem('social_private_key');
        if (!socialAddress || !socialPrivateKey) {
            // todo send error
            alert('Empty address or private key');
        }

        inviteWallet.setAccount(socialAddress, socialPrivateKey);

        const invite = InviteWallet.randomString(10);
        let walletData = null;
        let address = null;
        let walletSwarmHash = null;
        dispatch({
            type: types.INVITE_START_CREATION,
            data: {invite}
        });

        return inviteWallet.createWallet()
            .then(data => {
                walletData = data;
                address = '0x' + walletData.data.address;

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
                        walletSwarmHash = hash;
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
                    // todo catch error
                    console.error('Empty wallet data');
                    return;
                }

                dispatch({
                    type: types.INVITE_START_INVITE_TRANSACTION,
                    data: hash
                });

                return inviteWallet.createInvite(invite, address, hash, balance);
            })
            .then(data => {
                getBalance(inviteWallet.fromAddress)(dispatch);
                dispatch({
                    type: types.INVITE_INVITE_CREATED,
                    data: {
                        password: walletData.password,
                        privateKey: walletData.privateKey,
                        response: data,
                        address,
                        walletSwarmHash,
                    }
                });

                return true;
            })
            .catch(error => dispatch({
                type: types.INVITE_INVITE_FAILED,
                data: error.message
            }));
    }
};

export const getSwarmWallet = (address, password) => {
    return dispatch => {
        dispatch({
            type: types.INVITE_SWARM_WALLET_BY_ADDRESS_START
        });
        return inviteWallet.getWalletHashByAddress(address)
            .then(swarmHash => {
                dispatch({
                    type: types.INVITE_SWARM_WALLET_BY_ADDRESS_HASH_RECEIVED,
                    data: swarmHash
                });

                return swarmHash;
            })
            .then(swarmHash => bee.downloadWallet(swarmHash))
            .then(data => data.json())
            .then(data => {
                    dispatch({
                        type: types.INVITE_SWARM_WALLET_BY_ADDRESS_RECEIVED,
                        data
                    });

                    return data;
                }
            )
            .then(data => inviteWallet.validate(data, password))
            .then(data => {
                dispatch({
                    type: types.INVITE_CHECK_WALLET_OK,
                    data: {
                        address,
                        privateKey: data
                    }
                });
            })
            .catch(error =>
                dispatch({
                    type: types.INVITE_SWARM_WALLET_BY_ADDRESS_FAILED,
                    data: error
                })
            );
    };
};

export const registerUser = (invite, username, password) => {
    return dispatch => {
        dispatch({
            type: types.INVITE_REGISTRATION_STARTED
        });
        let newWalletSwarmHash = '';
        let privateKey = '';
        let parsedInvite = {};
        try {
            parsedInvite = InviteWallet.parseInvite(invite);
        } catch (error) {
            dispatch({
                type: types.INVITE_REGISTRATION_FAILED,
                data: error
            });
            return;
        }

        return inviteWallet.getWalletHashByAddress(parsedInvite.address)
            .then(swarmHash => bee.downloadWallet(swarmHash))
            .then(data => data.json())
            .then(dataKeyObject => {
                console.log(dataKeyObject);
                return inviteWallet.validate(dataKeyObject, parsedInvite.password)
                    .then(() => dataKeyObject)
                    .catch(() => null);
            })
            .then(data => {
                if (!data) {
                    throw new Error('Incorrect password for wallet');
                }

                return inviteWallet.changeWalletPassword(data, parsedInvite.password, password)
            })
            .then(data => {
                return bee.uploadWallet(JSON.stringify(data.data))
                    .then(hash => {
                        console.log('New wallet swarm hash', hash);
                        newWalletSwarmHash = hash;
                        privateKey = data.privateKey;

                        return data.privateKey;
                    });
            })
            .then(privateKey => inviteWallet.setAccount(parsedInvite.address, privateKey))
            .then(() => inviteWallet.setWalletFileHash(newWalletSwarmHash))
            .then(() => {
                localStorage.setItem('social_address', parsedInvite.address.toLowerCase());
                localStorage.setItem('social_wallet_hash', newWalletSwarmHash.toLowerCase());
                localStorage.setItem('social_private_key', privateKey);

                dispatch({
                    type: types.INVITE_STORE_AUTH
                });
            })
            .then(() => inviteWallet.setUsername(username))
            .then(result => {
                dispatch({
                    type: types.INVITE_REGISTRATION_COMPLETE,
                    data: {
                        isValid: true,
                        address: parsedInvite.address,
                        walletHash: newWalletSwarmHash,
                        privateKey
                    }
                });

                return result;
            })
            .then(() => init()(dispatch))
            .then(() => getBalance(parsedInvite.address)(dispatch))
            .catch(error =>
                dispatch({
                    type: types.INVITE_REGISTRATION_FAILED,
                    data: error.message
                })
            );
    };
};

export const getBalance = (address) => {
    return dispatch => {
        return inviteWallet.getBalance(address)
            .then(balance => dispatch({
                type: types.RECEIVED_BALANCE,
                data: balance
            }));
    };
};

export const getAuthData = () => {
    return dispatch => {
        const address = localStorage.getItem('social_address');
        const walletHash = localStorage.getItem('social_wallet_hash');
        const privateKey = localStorage.getItem('social_private_key');
        const isValid = (address && walletHash && privateKey) && address.length === 42 && (walletHash.length === 64 || walletHash.length === 128) && privateKey.length > 0;
        if (isValid) {
            getBalance(address)(dispatch);
            inviteWallet.setAccount(address, privateKey);
        }

        dispatch({
            type: types.INVITE_RECEIVED_STORED_AUTH,
            data: {
                isValid,
                address,
                walletHash
            }
        });
    };
};

export const login = (username, password) => {
    return dispatch => {
        dispatch({
            type: types.AUTH_START
        });
        let address = '';
        let walletSwarmHash = '';
        let privateKey = '';

        return inviteWallet.getAddressByUsername(username)
            .then(address => address === '0x0000000000000000000000000000000000000000' || !address ? null : address)
            .then(adr => {
                console.log('address is ' + adr);
                if (!adr) {
                    throw new Error('Incorrect login');
                }

                address = adr;

                return adr;
            })
            .then(address => inviteWallet.getWalletHashByAddress(address))
            .then(swarmHash => {
                console.log('hash is ' + swarmHash);

                if (swarmHash) {
                    walletSwarmHash = swarmHash;

                    return swarmHash;
                } else {
                    dispatch({
                        type: types.AUTH_INCORRECT_DATA,
                        data: 'Incorrect hash'
                    });
                }

            })
            .then(swarmHash => bee.downloadWallet(swarmHash))
            .then(data => data.json())
            .then(data => inviteWallet.validate(data, password).catch(() => null))
            .then(pKey => {
                console.log('pk is ' + pKey);
                if (pKey) {
                    privateKey = pKey;
                    inviteWallet.setAccount(address, pKey);
                } else {
                    /*dispatch({
                        type: types.AUTH_INCORRECT_DATA,
                        data: 'Incorrect password'
                    });*/
                    throw new Error("Incorrect password");
                }
            })
            .then(() => {
                localStorage.setItem('social_address', address.toLowerCase());
                localStorage.setItem('social_wallet_hash', walletSwarmHash.toLowerCase());
                localStorage.setItem('social_private_key', privateKey);

                dispatch({
                    type: types.AUTH_COMPLETE,
                    data: {
                        isValid: true,
                        address,
                        walletHash: walletSwarmHash,
                        privateKey
                    }
                });

                init()(dispatch);

                getBalance(address)(dispatch);
            })
            .catch(error =>
                dispatch({
                    type: types.AUTH_FAILED,
                    data: error.message
                })
            );
    };
};

export const userLogout = () => {
    return dispatch => {
        localStorage.setItem('social_address', '');
        localStorage.setItem('social_wallet_hash', '');
        localStorage.setItem('social_private_key', '');

        dispatch({
            type: types.AUTH_COMPLETE,
            data: {
                isValid: false,
                address: '',
                walletHash: ''
            }
        });
    };
};

export const saveChanges = () => {
    return dispatch => {
        console.log(bee.currentHash);
        dispatch({
            type: types.CHANGES_SAVE_START,
            data: bee.currentHash
        });

        inviteWallet.setHash(bee.currentHash)
            .then(data => dispatch({
                type: types.CHANGES_SAVE_COMPLETE,
                data
            }))
            .then(() => getBalance(inviteWallet.fromAddress)(dispatch))
            .catch(error => dispatch({
                type: types.CHANGES_SAVE_FAILED,
                data: error.message
            }));
    };
};
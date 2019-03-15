import {SwarmClient} from "@erebos/swarm-browser";
import User from "./User";
import Post from "./Post";
import File from "./File";
import ObjectConstructor from "./ObjectConstructor";
import CoreResponse from "./CoreResponse";
import Queue from 'promise-queue';

export const FILE_TYPE_ANY_BINARY = 'any_binary';
export const FILE_TYPE_IMAGE = 'image';
export const FILE_TYPE_VIDEO = 'video';

export default class Core {
    constructor(url = 'https://swarm-gateways.net', initHash = null, socialDirectory = 'social') {
        this.swarm = new SwarmClient({
            http: url,
        });
        this.currentHash = initHash;
        this.socialDirectory = socialDirectory;
        this.user = {};
    }

    prepareObject(data, dataClass) {
        const obj = new dataClass(data);
        const constructor = new ObjectConstructor(data, obj.getKeys());
        constructor.fillObject(obj);
        obj.prepareData();

        return obj;
    }

    onChangeHash(newHash) {

    }

    getUTCTimestamp() {
        return new Date().getTime();
    }

    /**
     *
     * @param newHash
     */
    changeCurrentHash(newHash) {
        this.currentHash = newHash;
        if (this.onChangeHash) {
            this.onChangeHash(newHash);
        }
    }

    /**
     *
     * @param path
     * @param dataClass
     * @returns {Promise<Response>}
     */
    download(path, dataClass) {
        return this.swarm.bzz.download(path)
            .then(res => res.json())
            .then(data => {
                return this.prepareObject(data, dataClass);
            });
    }

    /**
     *
     * @param path
     * @returns {Promise<(string)>}
     */
    delete(path) {
        console.log(this.currentHash);
        return this.swarm.bzz.deleteResource(this.currentHash, path)
            .then(hash => {
                console.log(hash);
                this.changeCurrentHash(hash);

                return hash;
            });
    }

    /**
     *
     * @param data
     * @param path
     * @param options
     * @param isStoreHash
     * @returns {Promise<CoreResponse>}
     */
    uploadFile(data, path, options = {}, isStoreHash = true) {
        let content = data;
        options.manifestHash = this.currentHash;

        if (path) {
            options.path = path;
        }

        if (content instanceof window.File) {
            options.contentType = content.type;
        } else {
            if (path && path.endsWith('.json')) {
                content = JSON.stringify(content);
                options.contentType = 'application/json';
            } else {
                options.contentType = 'text/plain';
            }
        }

        return this.swarm.bzz.uploadFile(content, options)
            .then(newHash => {
                if (isStoreHash) {
                    //this.currentHash = newHash;
                    this.changeCurrentHash(newHash)
                }

                // todo check data field with file
                return new CoreResponse(newHash, data, content, options);
            });
    }

    /**
     *
     * @returns {Promise<User>}
     */
    getMyProfile() {
        return this.getProfile()
            .then(data => {
                this.user = data;

                return data;
            });
    }

    /**
     *
     * @param hash
     * @returns {Promise<User>}
     */
    getProfile(hash = this.currentHash) {
        return this.download(`${hash}/${this.socialDirectory}/profile.json`, User);
    }

    /**
     *
     * @param profile
     * @param isUseOldProfile
     * @returns {Promise<CoreResponse>}
     */
    saveProfile(profile, isUseOldProfile = true) {
        // todo validate data
        let newProfile = profile;
        if (isUseOldProfile) {
            newProfile = Object.assign({}, this.user._data, profile);
        }

        newProfile.updated_at = this.getUTCTimestamp();
        if (!newProfile.created_at) {
            newProfile.created_at = this.getUTCTimestamp();
        }

        console.log(newProfile);

        return this.uploadFile(newProfile, `${this.socialDirectory}/profile.json`)
            .then(responseData => {
                this.user = this.prepareObject(newProfile, User);

                return responseData;
            });
    }

    /**
     *
     * @param id
     * @param hash
     * @returns {Promise<Post>}
     */
    getPost(id, hash = this.currentHash) {
        return this.download(`${hash}/${this.socialDirectory}/post/${id}/info.json`, Post);
    }

    _getProfileParam(paramName, defaultValue) {
        const data = this._getUserData();
        if (data[paramName]) {
            return data[paramName];
        }

        return defaultValue;
    }

    _getUserData() {
        return this.user && this.user._data ? this.user._data : {};
    }

    /**
     *
     * @param data
     * @returns {Promise<{data: *, hash: string}>}
     */
    createPost(data) {
        let id = this._getProfileParam('last_post_id', 0) + 1;
        let user = this._getUserData();
        user = Object.assign({}, user, {
            last_post_id: id
        });

        data.id = id;
        data.created_at = this.getUTCTimestamp();
        data.updated_at = this.getUTCTimestamp();

        let result = {
            data,
            hash: ''
        };

        // todo validate data
        return this.uploadFile(data, `${this.socialDirectory}/post/${id}/info.json`)
            .then(() => {
                return this.saveProfile(user);
            })
            .then((hash) => {
                result.hash = hash;

                return result;
            });
    }

    uploadUserFile(file, type = File, previews = []) {
        const queue = new Queue(1, Infinity);
        let id = this._getProfileParam('last_file_id', 0) + 1;
        let user = this._getUserData();
        user = Object.assign({}, user, {
            last_file_id: id
        });
        // todo implement init for different file types
        const info = {
            id,
            previews: [],
            type: type.getDataName(),
            content_type: file.type,
            created_at: this.getUTCTimestamp(),
            updated_at: this.getUTCTimestamp()
        };

        queue.add(() => {
            return this.uploadFile(file, `${this.socialDirectory}/file/${id}/file`)
                .then(data => this.changeCurrentHash(data.newHash));
        });

        previews.forEach((file) => {
            const previewPath = `${this.socialDirectory}/file/${id}/preview/file_${file.width}x${file.height}`;
            info.previews.push({
                width: file.width,
                height: file.height,
                path: previewPath
            });
            queue.add(() => {
                return this.uploadFile(file.blob, previewPath)
                    .then(data => this.changeCurrentHash(data.newHash));
            });
        });

        let returnData = {};
        queue.add(() => {
            return this.uploadFile(info, `${this.socialDirectory}/file/${id}/info.json`)
                .then((data) => {
                    this.changeCurrentHash(data.newHash);

                    return this.saveProfile(user);
                })
                .then((data) => {
                    this.changeCurrentHash(data.newHash);

                    returnData = {
                        hash: data.newHash,
                        info,
                        lastResponse: data
                    };

                    return returnData;
                });
        });

        return new Promise((resolve, reject) => {
            queue.add(() => {
                resolve(returnData);
            });
        });
    }

    /**
     *
     * @param id
     * @returns {Promise<string>}
     */
    deletePost(id) {
        // todo check for posts with content. how to remove full dir?
        return this.delete(`${this.socialDirectory}/post/${id}/info.json`);
    }
}
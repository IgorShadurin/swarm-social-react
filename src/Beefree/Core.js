import {SwarmClient} from "@erebos/swarm-browser";
import User from "./User";
import Post from "./Post";
import ObjectConstructor from "./ObjectConstructor";
import CoreResponse from "./CoreResponse";

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

    changeCurrentHash(newHash) {
        this.currentHash = newHash;
        if (this.onChangeHash) {
            this.onChangeHash(newHash);
        }
    }

    download(path, dataClass) {
        return this.swarm.bzz.download(path)
            .then(res => res.json())
            .then(data => {
                return this.prepareObject(data, dataClass);
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

        // todo check is work for submitted files
        if (content.type) {
            options.contentType = content.contentType;
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

                //return data;
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

    saveProfile(profile, isUseOldProfile = true) {
        // todo validate data
        let newProfile = profile;
        //console.log(isUseOldProfile);
        if (isUseOldProfile) {
            newProfile = Object.assign({}, this.user._data, profile);
        }

        console.log(newProfile);

        return this.uploadFile(newProfile, `${this.socialDirectory}/profile.json`)
            .then(responseData => {
                this.user = this.prepareObject(newProfile, User);

                return responseData;
            });
    }

    getPost(id, hash = this.currentHash) {
        return this.download(`${hash}/${this.socialDirectory}/post/${id}/info.json`, Post);
    }

    createPost(data) {
        let id = 1;
        let user = this.user && this.user._data ? this.user._data : {};
        if (this.user && this.user.last_post_id) {
            id = this.user.last_post_id + 1;
        }

        user = Object.assign({}, user, {
            last_post_id: id
        });

        data.id = id;
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
}
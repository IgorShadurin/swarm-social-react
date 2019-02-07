import {SwarmClient} from "@erebos/swarm-browser";
import User from "./User";
import Post from "./Post";
import ObjectConstructor from "./ObjectConstructor";

export default class Core {
    constructor(url = 'https://swarm-gateways.net', initHash = null, socialDirectory = 'social') {
        this.swarm = new SwarmClient({
            http: url,
        });
        this.currentHash = initHash;
        this.socialDirectory = socialDirectory;
    }

    download(path, dataClass) {
        return this.swarm.bzz.download(path)
            .then(res => res.json())
            .then(data => {
                const obj = new dataClass(data);
                const constructor = new ObjectConstructor(data, obj.getKeys());
                constructor.fillObject(obj);
                obj.prepareData();

                return obj;
            });
    }

    uploadFile(data, path, options = {}, isStoreHash = true) {
        options.manifestHash = this.currentHash;

        if (path) {
            options.path = path;
        }

        // todo check is work for submitted files
        if (data.type) {
            options.contentType = data.contentType;
        } else {
            if (path && path.endsWith('.json')) {
                data = JSON.stringify(data);
                options.contentType = 'application/json';
            } else {
                options.contentType = 'text/plain';
            }
        }

        return this.swarm.bzz.uploadFile(data, options)
            .then(data => {
                if (isStoreHash) {
                    this.currentHash = data;
                }

                return data;
            });
    }

    getMyProfile() {
        return this.getProfile();
    }

    saveMyProfile(data) {
        return this.saveProfile(data);
    }

    saveProfile(data) {
        // todo validate data
        return this.uploadFile(data, `${this.socialDirectory}/profile.json`);
    }

    getProfile(hash = this.currentHash) {
        return this.download(`${hash}/${this.socialDirectory}/profile.json`, User);
    }

    getPost(id, hash = this.currentHash) {
        return this.download(`${hash}/${this.socialDirectory}/post/${id}/info.json`, Post);
    }
}
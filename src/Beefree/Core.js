import {SwarmClient} from "@erebos/swarm-browser";
import User from "./User";
import Post from "./Post";
import ObjectConstructor from "./ObjectConstructor";

export default class Core {
    constructor() {
        this.swarm = new SwarmClient({
            //http: 'https://swarm-gateways.net',
            http: 'http://prototype.beefree.me',
        });
    }

    download(path, dataClass) {
        return this.swarm.bzz.download(path)
            .then(res => res.json())
            .then(data => {
                const obj = new dataClass(data);
                const constructor = new ObjectConstructor(data, obj.getKeys());
                constructor.fillObject(obj);

                return obj;
            });
    }

    getUser(hash) {
        return this.download(`${hash}/social/profile.json`, User);
    }

    getPost(id, hash) {
        return this.download(`${hash}/social/post/${id}/info.json`, Post);
    }
}
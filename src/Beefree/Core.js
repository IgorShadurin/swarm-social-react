import {SwarmClient} from "@erebos/swarm-browser";
import User from "./User";
import Post from "./Post";

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
            .then(data => new dataClass(data));
    }

    getUser(hash) {
        return this.download(`${hash}/social/profile.json`, User);
    }

    getPost(id, hash) {
        return this.download(`${hash}/social/post/${id}/info.json`, Post);
    }
}
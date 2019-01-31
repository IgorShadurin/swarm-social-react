import {SwarmClient} from '@erebos/swarm-browser'

class Social {
    constructor() {
        this.client = new SwarmClient({
            //http: 'https://swarm-gateways.net',
            http: 'http://prototype.beefree.me',
        });
    }

    getProfileAsync(hash = 'c346536df793635ad5641eaa8eecda1ccb8e9ef3efd106a8ffa40bbb7b74a7d2') {
        /*return fetch(`http://prototype.beefree.me/bzz:/${hash}/social/profile.json`)
            .then(response => response.json());*/
        return this.client.bzz.download(`${hash}/social/profile.json`).then(res => res.json())
    }
}

export default new Social();

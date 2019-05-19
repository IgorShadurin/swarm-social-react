import BaseObject from "./BaseObject";
import defaultAvatar from '../img/user/default.jpg'
import butterflyAvatar from '../img/user/butterfly.png'
import ObjectConstructor from "./ObjectConstructor";

export default class User extends BaseObject {
    constructor(data = {}) {
        super(data);
    }

    getKeys() {
        return [
            'first_name',
            'last_name',
            'username',
            'birth_date',
            'location',
            'photo',
            'about',
            'i_follow',
            'last_post_id',
            'last_photoalbum_id',
            'last_videoalbum_id',
            'ethereum_wallet',
            'version',
            'created_at',
            'updated_at'
        ];
    }

    prepareData() {
        /*const iFollow = [
            {
                'username': 'user1'
            },
            {
                'username': 'user2'
            },
            {
                'username': 'user3'
            },
            {
                'username': 'user4'
            },
        ];
        this.i_follow = iFollow.map(item => {
            // todo replace with real data
            let user = new User();
            const constructor = new ObjectConstructor(item, ['username']);
            constructor.fillObject(user);

            return user;
        });*/
    }

    static getNotifications(user) {
        return 123;
    }

    static getFullName(user) {
        const firstName = user && user.first_name ? user.first_name : '...';
        const lastName = user && user.last_name ? user.last_name : '';

        return `${firstName} ${lastName}`;
    }

    static getAvatar(user, size = 'preview') {
        return user && user.avatar && user.avatar.original ? user.avatar.original : User.getDefaultAvatar();
    }

    static getDefaultAvatar() {
        return User.isLovenet() ? butterflyAvatar : defaultAvatar;
    }

    static isLovenet() {
        //return window.location.host === 'localhost:3000';
        return window.location.host === 'lovenet.io';
    }

    static getIFollow(user) {
        return user && user.i_follow ? user.i_follow : []
    }

    static getUsername(username) {
        return username ? '@' + username : '';
    }

    static getClassName() {
        return 'User';
    }

    static getDataName() {
        return 'user';
    }
}

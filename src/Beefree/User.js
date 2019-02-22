import BaseObject from "./BaseObject";
import defaultAvatar from '../img/user/default.jpg'
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
            'updated_at_utc'
        ];
    }

    prepareData() {
        const iFollow = [
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
        });
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
        return user && user.avatar && user.avatar.original ? user.avatar.original : defaultAvatar;
    }
}
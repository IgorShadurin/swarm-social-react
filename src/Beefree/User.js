import BaseObject from "./BaseObject";
import defaultAvatar from '../img/user/default.jpg'

export default class User extends BaseObject {
    constructor(data = {}) {
        super(data);
    }

    getKeys() {
        return [
            'first_name',
            'last_name',
            'birth_date',
            'location',
            'photo',
            'about',
            'i_follow',
            'last_post_id',
            'last_photoalbum_id',
            'last_videoalbum_id',
            'ethereum_wallet',
            'version'
        ];
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
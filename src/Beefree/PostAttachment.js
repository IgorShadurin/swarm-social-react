import BaseObject from "./BaseObject";

export default class PostAttachment extends BaseObject {
    constructor(data = {}) {
        super(data);
        //console.log(data);
    }

    getKeys() {
        return [
            //'id',
            'post_id',
            //'previews',
            'type',
            //'url',
            'order',
            //'object'
        ];
    }

    static getClassName() {
        return 'PostAttachment';
    }

    static getDataName() {
        return 'post_attachment';
    }
}
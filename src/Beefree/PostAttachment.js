import BaseObject from "./BaseObject";

export default class PostAttachment /*extends BaseObject*/ {
    /*constructor(data = {}) {
        super(data);
    }*/

    getKeys() {
        return [
            'id',
            'previews',
            'type',
            'url',
        ];
    }
}
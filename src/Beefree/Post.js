import BaseObject from "./BaseObject";

export default class Post extends BaseObject {
    constructor(data = {}) {
        super(data);
        console.log(data);
    }

    getKeys() {
        return [
            'id',
            'description',
            'attachments'
        ];
    }
}
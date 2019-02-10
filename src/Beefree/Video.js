import BaseObject from "./BaseObject";

export default class Video extends BaseObject {
    constructor(data = {}) {
        super(data);
        //console.log(data);
    }

    getKeys() {
        return [
            'id',
            'previews',
            'type',
            'url',
        ];
    }
}
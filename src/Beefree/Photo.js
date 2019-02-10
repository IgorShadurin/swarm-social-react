import BaseObject from "./BaseObject";

export default class Photo extends BaseObject {
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
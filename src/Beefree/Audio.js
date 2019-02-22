import BaseObject from "./BaseObject";

export default class Audio extends BaseObject {
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
            'created_at',
            'updated_at'
        ];
    }
}
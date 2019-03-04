import BaseObject from "./BaseObject";

export default class Link extends BaseObject {
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

    static getClassName() {
        return 'Link';
    }

    static getDataName() {
        return 'link';
    }
}
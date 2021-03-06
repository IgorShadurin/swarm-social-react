import BaseObject from "./BaseObject";

export default class File extends BaseObject {
    constructor(data = {}) {
        super(data);
        //console.log(data);
    }

    getKeys() {
        return [
            'id',
            'created_at',
            'updated_at',
        ];
    }

    static getClassName() {
        return 'File';
    }

    static getDataName() {
        return 'file';
    }
}
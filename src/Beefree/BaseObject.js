export default class BaseObject {
    constructor(data = {}) {
        this._data = data;
    }

    getKeys() {
        return [];
    }

    prepareData() {
        // some prepare manipulations
    }

    static getPublicName() {
        return 'not_implemented_object';
    }
}
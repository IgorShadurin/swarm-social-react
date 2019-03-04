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

    static getClassName() {
        return 'BaseObject';
    }

    static getDataName() {
        return 'BaseObject';
    }
}
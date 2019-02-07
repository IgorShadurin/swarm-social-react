export default class BaseObject {
    constructor(data = {}) {
        this._data = data;
    }

    getKeys() {
        return [];
    }
}
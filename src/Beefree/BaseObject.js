export default class BaseObject {

    constructor(data = {}) {
        this.data = data;
    }

    getKeys() {
        return [];
    }

    static fromObject(object) {
        return new this(object);
    }

    static fromArray(items) {
        let result = [];
        for (let item in items) {
            result.push(new this(item));
        }

        return result;
    }
}
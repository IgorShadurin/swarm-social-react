import ObjectConstructor from "./ObjectConstructor";

export default class BaseObject {
    static TYPE_ARRAY = 'array';

    constructor(data = {}) {
        let obj = new ObjectConstructor(data, this.getKeys());
        if (obj.isValid()) {
            obj.fillObject(this);
        }
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
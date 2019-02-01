export default class BaseObject {
    constructor(data = {}) {
        // todo research and add some validator mechanism
        if (Object.keys(data).length) {
            const keys = this.getKeys();
            for (let key in keys) {
                key = keys[key];
                this[key] = data[key];
            }
        }
    }

    getKeys() {
        return [];
    }

    static fromObject(object) {
        return new this(object);
    }
}
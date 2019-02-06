import PostAttachment from "./PostAttachment";
import User from './User';
import BaseObject from './BaseObject';

export default class ObjectConstructor {
    constructor(data = {}, keys = []) {
        this.data = {};
        this.classes = {
            PostAttachment,
            User
        };
        if (Object.keys(data).length && Object.keys(keys).length) {
            console.log(keys, data);
            for (let index in keys) {
                const key = keys[index];
                let value = data[key];
                console.log(key, value);

                if (typeof(key) === 'object') {
                    if (key.type === BaseObject.TYPE_ARRAY) {
                        if (!this.classes[key.array_type]) {
                            console.error('Data class is not supported: ' + key.array_type);
                            continue;
                        }

                        //console.log(this.classes[key.array_type]);
                        const items = data[key.name];
                        console.log(items);
                        value = new this.classes[key.array_type](items[0]);
                        console.log(value);
                        this.data[key.name] = value;

                        //console.log(new this[key.array_type]());
                        //console.log(new 'PostAttachment'());
                    }
                } else {
                    this.data[key] = value;
                }
            }
        }
    }

    fillObject(object) {
        // todo optimize it with default js function?
        if (Object.keys(this.data).length) {
            for (let key in this.data) {
                object[key] = this.data[key];
            }
        }
    }

    isValid() {
        // todo implement and add some validator mechanism
        return true;
    }
}
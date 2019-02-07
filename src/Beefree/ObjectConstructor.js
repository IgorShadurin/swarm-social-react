import PostAttachment from "./PostAttachment";
import User from './User';

export default class ObjectConstructor {
    static TYPE_ARRAY = 'array';

    constructor(data, keys) {
        this.data = {};
        this.classes = {
            PostAttachment,
            User
        };
        if (Object.keys(data).length && Object.keys(keys).length) {
            //console.log(keys, data);
            for (let index in keys) {
                const key = keys[index];
                let value = data[key];
                //console.log(key, value);

                if (typeof(key) === 'object') {
                    if (key.type === ObjectConstructor.TYPE_ARRAY) {
                        if (!this.classes[key.array_type]) {
                            console.error('Data class is not supported: ' + key.array_type);
                            continue;
                        }

                        //console.log(this.classes[key.array_type]);
                        let result = [];
                        const items = data[key.name];
                        //console.log(items);
                        for (let item in items) {
                            let itemData = items[item];
                            //console.log(itemData);
                            value = new this.classes[key.array_type](itemData);
                            //console.log(value);
                            const constructor = new ObjectConstructor(itemData, value.getKeys());
                            constructor.fillObject(value);
                            result.push(value);
                        }

                        this.data[key.name] = result;

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
        //console.log(this.data);
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
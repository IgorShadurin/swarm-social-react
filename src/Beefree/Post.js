import BaseObject from "./BaseObject";
import ObjectConstructor from "./ObjectConstructor";
import PostAttachment from "./PostAttachment";

export default class Post extends BaseObject {
    constructor(data = {}) {
        super(data);
    }

    prepareData() {
    }

    getKeys() {
        return [
            'id',
            'description',
            'created_at_utc',
            'updated_at_utc',
            {
                name: 'attachments',
                type: ObjectConstructor.TYPE_ARRAY,
                array_type: PostAttachment.name
            }
        ];
    }
}
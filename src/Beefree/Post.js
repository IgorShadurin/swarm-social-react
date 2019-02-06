import BaseObject from "./BaseObject";
import PostAttachment from "./PostAttachment";

export default class Post extends BaseObject {
    constructor(data = {}) {
        super(data);
        //console.log(data);
    }

    getKeys() {
        return [
            'id',
            'description',
            {
                name: 'attachments',
                type: BaseObject.TYPE_ARRAY,
                array_type: PostAttachment.name
            }
        ];
    }
}
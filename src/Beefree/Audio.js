import File from './File';

export default class Audio extends File {
    constructor(data = {}) {
        super(data);
        //console.log(data);
    }

    getKeys() {
        return [
            'id',
            'previews',
            'type',
            'url',
            'created_at',
            'updated_at'
        ];
    }
}
import File from './File';

export default class Image extends File {
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
        ];
    }

    static getPublicName() {
        return 'image';
    }
}
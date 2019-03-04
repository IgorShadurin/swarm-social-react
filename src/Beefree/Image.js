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

    static getClassName() {
        return 'Image';
    }

    static getDataName() {
        return 'image';
    }
}
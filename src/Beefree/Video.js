import File from './File';

export default class Video extends File {
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
        return 'Video';
    }

    static getDataName() {
        return 'video';
    }
}
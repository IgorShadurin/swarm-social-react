export default class CoreResponse {
    /**
     *
     * @param newHash Hash after all changes
     * @param data Data passed to method
     * @param sentData Data sent to swarm (ex: passed object converted to string)
     * @param options Sending options
     */
    constructor(newHash, data, sentData, options) {
        this.newHash = newHash;
        this.data = data;
        this.sentData = sentData;
        this.options = options;
    }
}
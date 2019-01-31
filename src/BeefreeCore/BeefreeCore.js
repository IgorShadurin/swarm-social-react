class BeefreeCore {
    constructor() {

    }

    getProfile(hash) {
        return new Promise((resolve, reject) => {
            resolve({
                first_name: 'Hello name'
            });
        });
    }
}

export default new BeefreeCore();
'use strict';

class ProcessService {

    /* istanbul ignore next */
    /**
     * @return {ProcessService}
     */
    static getInstance() {
        if (ProcessService.instance === null) {
            ProcessService.instance = new ProcessService();
        }
        return ProcessService.instance;
    }

    /**
     * @returns {ProcessService}
     */
    constructor() {
        this.is_processing = false;
    }

    /**
     * @param {String} url
     * @return {String}
     */
    process() {
        this.is_processing = true;
        // code to process goes here

        this.is_processing = false;
    }

}

ProcessService.instance = null;

module.exports = {
    ProcessService,
};

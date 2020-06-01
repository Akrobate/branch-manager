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
        this.job_queue_list = [];
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


    /**
     * @returns {Pormise}
     */
    executeJobsInQueue() {
        const job_to_execute = this.job_queue_list.shift();
        if (this.queueIsEmpty()) {
            return Promise.resolve();
        }
        return new Promise(
            (resolve, reject) => job_to_execute
                .execute()
                .then(() => this.executeJobsInQueue())
                .then(resolve)
                .catch(reject)
        );
    }


    /**
     * @param {JobAbstract} job
     * @returns {Void}
     */
    addJob(job) {
        this.job_queue_list.push(job);
    }


    /**
     * @returns {Boolen}
     */
    isProcessing() {
        return this.is_processing;
    }

    /**
     * @returns {Boolean}
     */
    queueIsEmpty() {
        return this.job_queue_list.length === 0;
    }

}

ProcessService.instance = null;

module.exports = {
    ProcessService,
};

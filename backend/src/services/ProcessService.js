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
        return new Promise((resolve, reject) => {
            if (this.is_processing()) {
                return reject(new Error('BUSY_PROCESSOR'));
            }
            this.is_processing = true;
            return this
                .executeJobsInQueue()
                .then(() => {
                    this.is_processing = false;
                    return resolve();
                })
                .catch((error) => {
                    this.is_processing = false;
                    return reject(error);
                });
        });
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

'use strict';

class AbstractJob {


    /**
     * @returns {AbstractJob}
     */
    constructor() {
        this.status = AbstractJob.STATUS.IDLE;
    }


    /**
     * @param {String} url
     * @return {String}
     */
    execute() {
        this.setStatus(AbstractJob.STATUS.RUNNING);
        // code to process goes here

        this.setStatus(AbstractJob.STATUS.FINISHED);
    }


    /**
     * @throws {Error}
     * @returns {Void}
     */
    process() {
        throw new Error('Process method must be overriden in AbstractJob');
    }


    /**
     *
     * @param {Integer} status
     * @returns {Void}
     */
    setStatus(status) {
        this.status = status;
    }


    /**
     * Statuses list
     */
    static get STATUS() {
        return {
            IDLE: 0,
            RUNNING: 1,
            FINISHED: 2,
            STOPPED: 3,
        };
    }
}

module.exports = {
    AbstractJob,
};

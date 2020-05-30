'use strict';

class AbstractJob {

    /**
     * @param {String} url
     * @return {String}
     */
    process() {
        this.job_status = 'running';
        // code to process goes here

        this.job_status = 'finished';
    }

}

module.exports = {
    AbstractJob,
};

'use strict';

class UpdateProjectRepositoriesJob {

    /**
     * @param {String} project_id
     * @returns {UpdateProjectRepositoriesJob}
     */
    constructor(project_id) {
        this.job_status = 'idle';
        this.job_status = project_id;
    }

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

UpdateProjectRepositoriesJob.instance = null;

module.exports = {
    UpdateProjectRepositoriesJob,
};

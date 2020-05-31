'use strict';

const {
    AbstractJob,
} = require('./AbstractJob');

class UpdateProjectRepositoriesJob extends AbstractJob {

    /**
     * @param {String} project_id
     * @returns {UpdateProjectRepositoriesJob}
     */
    constructor() {
        super();
        this.project_id = null;
    }


    /**
     * @param {String} url
     * @return {String}
     */
    process() {
        // code to process goes here
    }


    /**
     * @param {String} project_id
     * @returns {Void}
     */
    setProjectId(project_id) {
        this.project_id = project_id;
    }

}

UpdateProjectRepositoriesJob.instance = null;

module.exports = {
    UpdateProjectRepositoriesJob,
};

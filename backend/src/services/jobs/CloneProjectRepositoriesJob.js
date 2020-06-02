'use strict';

const {
    AbstractJob,
} = require('./AbstractJob');

const {
    ProjectService,
} = require('../ProjectService');

class CloneProjectRepositoriesJob extends AbstractJob {

    /**
     * @param {ProjectService} project_service
     * @returns {CloneProjectRepositoriesJob}
     */
    constructor(project_service) {
        super();
        this.project_service = project_service;

        this.project_id = null;
    }


    /**
     * @static
     * @returns {CloneProjectRepositoriesJob}
     */
    static buildJob() {
        return new CloneProjectRepositoriesJob(
            ProjectService.getInstance()
        );
    }


    /**
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

CloneProjectRepositoriesJob.instance = null;

module.exports = {
    CloneProjectRepositoriesJob,
};

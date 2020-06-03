'use strict';

const {
    AbstractJob,
} = require('./AbstractJob');

const {
    logger,
} = require('../../logger');

const {
    ProjectService,
} = require('../ProjectService');

class UpdateProjectRepositoriesJob extends AbstractJob {

    /**
     * @param {ProjectService} project_service
     * @returns {UpdateProjectRepositoriesJob}
     */
    constructor(project_service) {
        super();
        this.project_service = project_service;
        this.project_id = null;
    }


    /**
     * @static
     * @returns {UpdateProjectRepositoriesJob}
     */
    static buildJob() {
        return new UpdateProjectRepositoriesJob(
            ProjectService.getInstance()
        );
    }


    /**
     * @return {String}
     */
    process() {
        // code to process goes here
        this.project_service
            .getProject(this.project_id)
            .then((project_data) => {
                logger.log(project_data);
            });
    }


    /**
     * @param {String} project_id
     * @returns {Void}
     */
    setProjectId(project_id) {
        this.project_id = project_id;
    }

}

module.exports = {
    UpdateProjectRepositoriesJob,
};

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

const {
    CommandLineService,
} = require('../CommandLineService');

const {
    GitService,
} = require('../GitService');

class UpdateProjectRepositoriesJob extends AbstractJob {

    /**
     * @param {ProjectService} project_service
     * @param {CommandLineService} command_line_service
     * @param {GitService} git_service
     * @returns {UpdateProjectRepositoriesJob}
     */
    constructor(
        project_service,
        command_line_service,
        git_service
    ) {
        super();
        this.project_service = project_service;
        this.command_line_service = command_line_service;
        this.git_service = git_service;
        this.project_id = null;
    }


    /**
     * @static
     * @returns {UpdateProjectRepositoriesJob}
     */
    static buildJob() {
        return new UpdateProjectRepositoriesJob(
            ProjectService.getInstance(),
            CommandLineService.getInstance(),
            GitService.getInstance()
        );
    }


    /**
     * @return {Promise}
     */
    process() {
        // code to process goes here
        return this
            .project_service
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

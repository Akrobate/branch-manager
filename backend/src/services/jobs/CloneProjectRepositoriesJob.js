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

class CloneProjectRepositoriesJob extends AbstractJob {

    /**
     * @param {ProjectService} project_service
     * @param {CommandLineService} command_line_service
     * @param {GitService} git_service
     * @returns {CloneProjectRepositoriesJob}
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
     * @returns {CloneProjectRepositoriesJob}
     */
    static buildJob() {
        return new CloneProjectRepositoriesJob(
            ProjectService.getInstance(),
            CommandLineService.getInstance(),
            GitService.getInstance()
        );
    }


    /**
     * @return {String}
     */
    process() {
        // code to process goes here
        return this
            .project_service
            .getProject(this.project_id)
            .then((project_data) => {
                logger.log(project_data);
            })
            .then(() => this.getAllRepositories(this.project_id))
            .then((repository_list) => {
                logger.log(repository_list);
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

CloneProjectRepositoriesJob.instance = null;

module.exports = {
    CloneProjectRepositoriesJob,
};

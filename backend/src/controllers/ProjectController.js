'use strict';

const {
    ProjectService,
} = require('../services');

const {
    ProcessService,
} = require('../services');

class ProjectController {

    /* istanbul ignore next */
    /**
     * @return {ProjectController}
     */
    static getInstance() {
        if (ProjectController.instance === null) {
            ProjectController.instance = new ProjectController(
                ProjectService.getInstance(),
                ProcessService.getInstance()
            );
        }
        return ProjectController.instance;
    }

    /**
     * @param {ProjectService} project_service
     * @param {ProcessService} process_service
     */
    constructor(project_service, process_service) {
        this.project_service = project_service;
        this.process_service = process_service;
    }

    /**
     * @param {Resquest} request
     * @param {Response} response
     * @returns {Promise<Object>}
     */
    getAllProjects(request, response) {
        return this.project_service
            .getAllProjects()
            .then((data) => response.json(data));
    }

    /**
     * @param {Resquest} request
     * @param {Response} response
     * @returns {Promise<Object>}
     */
    getProject(request, response) {
        const {
            id,
        } = request.params;
        return this.project_service
            .getProject(id)
            .then((data) => response.json(data));
    }

    /**
     * @param {Resquest} request
     * @param {Response} response
     * @returns {Promise<Object>}
     */
    processUpdateProject(request, response) {
        const {
            id,
        } = request.params;
        return this.process_service
            .addJob(id)
            .then((data) => response.json(data));
    }

}

ProjectController.instance = null;

module.exports = {
    ProjectController,
};

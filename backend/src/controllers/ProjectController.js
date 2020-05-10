'use strict';

const {
    ProjectService,
} = require('../services');

class ProjectController {

    /**
     * @return {ProjectController}
     */
    static getInstance() {
        if (ProjectController.instance === null) {
            ProjectController.instance = new ProjectController(
                ProjectService.getInstance()
            );
        }
        return ProjectController.instance;
    }

    /**
     * @param {ProjectService} project_service
     */
    constructor(project_service) {
        this.project_service = project_service;
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

}

ProjectController.instance = null;

module.exports = {
    ProjectController,
};

'use strict';

const {
    ProjectService,
} = require('../services');

class ProjectController {

    /* istanbul ignore next */
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
    async getAllProjects(request, response) {
        const data = await this.project_service.getAllProjects();
        return response.json(data);
    }

    /**
     * @param {Resquest} request
     * @param {Response} response
     * @returns {Promise<Object>}
     */
    async getProject(request, response) {
        const {
            id,
        } = request.params;
        const data = await this.project_service.getProject(id);
        return response.json(data);
    }

    /**
     * @param {Resquest} request
     * @param {Response} response
     * @returns {Promise<Object>}
     */
    async addProcessProjectUpdateRepository(request, response) {
        const {
            id,
        } = request.params;
        const data = await this.project_service.addProcessProjectUpdateRepository(id);
        return response.json(data);
    }

}

ProjectController.instance = null;

module.exports = {
    ProjectController,
};

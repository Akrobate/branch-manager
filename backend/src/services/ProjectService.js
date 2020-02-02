'use strict';

const {
    ProjectRepository,
} = require('../repositories');

class ProjectService {

    /**
     * @return {ProjectService}
     */
    static getInstance() {
        if (ProjectService.instance === null) {
            ProjectService.instance = new ProjectService(
                ProjectRepository.getInstance()
            );
        }
        return ProjectService.instance;
    }

    /**
     * @param {ProjectRepository} project_repository
     */
    constructor(project_repository) {
        this.project_repository = project_repository;
    }

    /**
     * @returns {Promise<Object>}
     */
    getAllProjects() {
        return this.project_repository
            .getAllProjects();
    }

}

ProjectService.instance = null;

module.exports = {
    ProjectService,
};

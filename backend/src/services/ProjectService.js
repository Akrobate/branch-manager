'use strict';

const {
    ProjectRepository,
} = require('../repositories');

const {
    ProcessService,
} = require('./ProcessService');

const {
    UpdateProjectRepositoriesJob,
} = require('./jobs');

class ProjectService {

    /* istanbul ignore next */
    /**
     * @return {ProjectService}
     */
    static getInstance() {
        if (ProjectService.instance === null) {
            ProjectService.instance = new ProjectService(
                ProjectRepository.getInstance(),
                ProcessService.getInstance()
            );
        }
        return ProjectService.instance;
    }

    /**
     * @param {ProjectRepository} project_repository
     * @param {ProcessService} process_service
     */
    constructor(project_repository, process_service) {
        this.project_repository = project_repository;
        this.process_service = process_service;
    }

    /**
     * @returns {Promise<Object>}
     */
    getAllProjects() {
        return this.project_repository
            .getAllProjects();
    }

    /**
     * @param {String} id
     * @returns {Promise<Object>}
     */
    getProject(id) {
        return this.project_repository
            .getProject(id);
    }

    /**
     * @param {String} id
     * @returns {Promise<Object>}
     */
    getAllRepositories(id) {
        return this.project_repository
            .getAllRepositories(id);
    }

    /**
     * @param {String} id
     * @returns {Promise<Object>}
     */
    addProcessProjectUpdateRepository(id) {
        const update_repositories_job = UpdateProjectRepositoriesJob.buildJob();
        update_repositories_job.setProjectId(id);
        return this.process_service
            .addJob(update_repositories_job);
    }

}

ProjectService.instance = null;

module.exports = {
    ProjectService,
};

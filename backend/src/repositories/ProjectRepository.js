'use strict';

const {
    FileSystemRepository,
} = require('./FileSystemRepository');

class ProjectRepository {

    /**
     * @static
     * @return {String}
     */
    static get PROJECT_DIR() {
        return `${__dirname}/../../data/projects`;
    }

    /**
     * @return {ProjectRepository}
     */
    static getInstance() {
        if (ProjectRepository.instance === null) {
            ProjectRepository.instance = new ProjectRepository(
                FileSystemRepository.getInstance()
            );
        }
        return ProjectRepository.instance;
    }

    /**
     * @param {FileSystemRepository} file_system_repository
     */
    constructor(file_system_repository) {
        this.file_system_repository = file_system_repository;
    }

    /**
     * @return {Object}
     */
    getAllProjects() {
        return Promise.resolve([]);
    }

    /**
     * @param {String} project_name
     * @return {Object}
     */
    getProject(project_name) {
        return Promise.resolve(project_name);
    }

    /**
     * @param {String} project_name
     * @return {Promise}
     */
    createProject(project_name) {
        // create project directory
        // create project yaml configuration file
        return Promise.resolve(project_name);
    }

}

ProjectRepository.instance = null;

module.exports = {
    ProjectRepository,
};

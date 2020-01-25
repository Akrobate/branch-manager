'use strict';

const {
    FileSystemRepository,
} = require('./FileSystemRepository');

const {
    v4,
} = require('uuid');

class ProjectRepository {

    /**
     * @static
     * @return {String}
     */
    static get PROJECTS_DIR_NAME() {
        return 'projects';
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
     * @return {String}
     */
    getProjectsDirnamePath() {
        return `${this.file_system_repository.getDataDir()}${ProjectRepository.PROJECTS_DIR_NAME}/`;
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
     * @param {String} id
     * @return {Object}
     */
    getProject(id) {
        return Promise.resolve(project_name);
    }

    /**
     * @param {String} project_name
     * @return {Promise}
     */
    createProject(project_name) {

        const id = v4();
        const directory = `${this.getProjectsDirnamePath}${id}`;
        const configuration_file = `${directory}/project.yaml`;
        // create project yaml configuration file
        const project = {
            id,
            name: project_name,
            branch_flow: [],
            repository_list: [],
        };

        return this.file_system_repository
            // create project directory
            .createDirectory(directory)
            // write configuration file
            .then(() => this.file_system_repository.writeYamlFile(configuration_file, project));
    }

}

ProjectRepository.instance = null;

module.exports = {
    ProjectRepository,
};

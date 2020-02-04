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
        return this
            .file_system_repository
            .listDirectory(this.getProjectsDirnamePath());
    }

    /**
     * @param {String} id
     * @return {Object}
     */
    getProject(id) {
        const directory = `${this.getProjectsDirnamePath()}${id}`;
        return this.file_system_repository
            .readYamlFile(`${directory}/project.yaml`);
    }

    /**
     * @param {String} project_name
     * @return {Promise}
     */
    createProject(project_name) {

        const id = v4();
        const directory = `${this.getProjectsDirnamePath()}${id}`;
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

    /**
     * @param {String} id
     * @param {Object} project
     * @return {Promise}
     */
    updateProject(id, project) {
        const directory = `${this.getProjectsDirnamePath()}${id}`;
        const configuration_file = `${directory}/project.yaml`;
        return this
            .getProject(id)
            .then((saved_project) => Object.assign({}, saved_project, project))
            .then((updated_project) => this.file_system_repository.writeYamlFile(configuration_file, updated_project));
    }

    /**
     * @param {String} project_id
     * @param {Object} repository
     * @return {Promise<Object>}
     */
    addRepository(project_id, repository) {
        // @todo Define repository object
        return this.getAllRepositories(project_id)
            .then((repository_list) => repository_list.push(repository))
            .then((repository_list) => this
                .updateProject(
                    project_id,
                    {
                        repository_list,
                    }
                )
            );
    }

    /**
     * @param {String} project_id
     * @param {Object} repository
     * @return {Promise<Array>}
     */
    getAllRepositories(project_id) {
        return this.getProject(project_id)
            .then((project) => project.repository_list);
    }

}

ProjectRepository.instance = null;

module.exports = {
    ProjectRepository,
};

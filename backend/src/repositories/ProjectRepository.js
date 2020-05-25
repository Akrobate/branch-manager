'use strict';

const Promise = require('bluebird');

const {
    FileSystemRepository,
} = require('./FileSystemRepository');

const {
    ListObjectRepository,
} = require('./ListObjectRepository');

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
     * @static
     * @return {String}
     */
    static get PROJECTS_REPOSITORIES_DIR_NAME() {
        return 'repositories';
    }


    /**
     * @return {String}
     */
    getProjectsDirnamePath() {
        return `${this.file_system_repository.getDataDir()}${ProjectRepository.PROJECTS_DIR_NAME}/`;
    }


    /* istanbul ignore next */
    /**
     * @return {ProjectRepository}
     */
    static getInstance() {
        if (ProjectRepository.instance === null) {
            ProjectRepository.instance = new ProjectRepository(
                FileSystemRepository.getInstance(),
                ListObjectRepository.getInstance()
            );
        }
        return ProjectRepository.instance;
    }


    /**
     * @param {FileSystemRepository} file_system_repository
     * @param {ListObjectRepository} list_object_repository
     */
    constructor(
        file_system_repository,
        list_object_repository
    ) {
        this.file_system_repository = file_system_repository;
        this.list_object_repository = list_object_repository;
    }

    /**
     * @return {Object}
     */
    getAllProjects() {
        return this
            .file_system_repository
            .listDirectory(this.getProjectsDirnamePath())
            .then((listed_dir_content) => listed_dir_content
                .filter((item) => item !== '.gitignore'))
            .then((project_directory_list) => Promise.map(
                project_directory_list,
                (project_id) => this.getProject(project_id)
            ));
    }

    /**
     * @param {*} criteria
     * @return {Promise<Array>}
     */
    searchProject(criteria) {
        return this
            .getAllProjects()
            .then((project_list) => this
                .list_object_repository
                .search(criteria, project_list)
            );
    }

    /**
     * @param {String} id
     * @return {Object}
     */
    getProject(id) {
        const directory = `${this.getProjectsDirnamePath()}${id}`;
        return this.file_system_repository
            .readYamlFile(`${directory}/project.yml`);
    }

    /**
     * @param {String} project_name
     * @return {Promise}
     */
    createProject(project_name) {

        const id = v4();
        const directory = `${this.getProjectsDirnamePath()}${id}`;
        const configuration_file = `${directory}/project.yml`;
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
            .then(() => this.file_system_repository.writeYamlFile(configuration_file, project))
            .then(() => this.file_system_repository
                .createDirectory(`${directory}/${ProjectRepository.PROJECTS_REPOSITORIES_DIR_NAME}`)
            );
    }

    /**
     * @param {String} id
     * @param {Object} project
     * @return {Promise}
     */
    updateProject(id, project) {
        const directory = `${this.getProjectsDirnamePath()}${id}`;
        const configuration_file = `${directory}/project.yml`;
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

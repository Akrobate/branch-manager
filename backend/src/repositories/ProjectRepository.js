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
    async getAllProjects() {
        const listed_dir_content = await this.file_system_repository.listDirectory(this.getProjectsDirnamePath());
        const project_directory_list = listed_dir_content.filter((item) => item !== '.gitignore');
        return Promise.map(
            project_directory_list,
            (project_id) => this.getProject(project_id)
        );
    }


    /**
     * @param {*} criteria
     * @return {Promise<Array>}
     */
    async searchProject(criteria) {
        const project_list = await this.getAllProjects();
        return this.list_object_repository.search(criteria, project_list);
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
    async createProject(project_name) {

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

        await this.file_system_repository.createDirectory(directory);
        await this.file_system_repository.writeYamlFile(configuration_file, project);
        return this.file_system_repository.createDirectory(`${directory}/${ProjectRepository.PROJECTS_REPOSITORIES_DIR_NAME}`);
    }


    /**
     * @param {String} id
     * @param {Object} project
     * @return {Promise}
     */
    async updateProject(id, project) {
        const directory = `${this.getProjectsDirnamePath()}${id}`;
        const configuration_file = `${directory}/project.yml`;
        const saved_project = await this.getProject(id);
        const updated_project = {
            ...saved_project,
            ...project,
        };
        return this.file_system_repository.writeYamlFile(configuration_file, updated_project);
    }

    /**
     * @param {String} project_id
     * @param {Object} repository
     * @return {Promise<Object>}
     */
    async addRepository(project_id, repository) {
        // @todo Define repository object
        const repository_list = await this.getAllRepositories(project_id);
        repository_list.push(repository);
        return this.updateProject(
            project_id,
            {
                repository_list,
            }
        );
    }

    /**
     * @param {String} project_id
     * @param {Object} repository
     * @return {Promise<Array>}
     */
    async getAllRepositories(project_id) {
        const project = await this.getProject(project_id);
        return project.repository_list;
    }

}

ProjectRepository.instance = null;

module.exports = {
    ProjectRepository,
};

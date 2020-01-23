'use strict';

const {
    FileSystemRepository,
} = require('./FileSystemRepository');

class GitCredentialRepository {

    /**
     * @static
     * @return {String}
     */
    static get GIT_CREDENTIAL_FILE_NAME() {
        return 'credentials.yml';
    }

    /**
     * @return {GitCredentialRepository}
     */
    static getInstance() {
        if (GitCredentialRepository.instance === null) {
            GitCredentialRepository.instance = new GitCredentialRepository(
                FileSystemRepository.getInstance()
            );
        }
        return GitCredentialRepository.instance;
    }

    /**
     * @param {FileSystemRepository} file_system_repository
     */
    constructor(file_system_repository) {
        this.file_system_repository = file_system_repository;
    }

    /**
     * @return {String}
     */
    getGitCredentialFileName() {
        return GitCredentialRepository.GIT_CREDENTIAL_FILE_NAME;
    }

    /**
     * @return {String}
     */
    getCredentialFilenamePath() {
        return `${__dirname}/../../data/${this.getGitCredentialFileName()}`;
    }

    /**
     * @return {Object}
     */
    getCredentials() {
        return this.file_system_repository
            .readYamlFile(this.getCredentialFilenamePath());
    }

    /**
     * @param {Array} data
     * @return {Promise}
     */
    saveCredentials(data) {
        return this.file_system_repository
            .writeYamlFile(this.getCredentialFilenamePath(), data);
    }

}


GitCredentialRepository.instance = null;

module.exports = {
    GitCredentialRepository,
};

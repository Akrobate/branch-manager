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
        return `${this.file_system_repository.getDataDir()}${this.getGitCredentialFileName()}`;
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

    /**
     * @param {Object} criteria
     * @return {Array<Object>}
     */
    search(criteria) {
        if (criteria === undefined || criteria === null) {
            return this.getCredentials();
        }
        return this.getCredentials()
            .then((credential_list) => credential_list
                .filter((credential) => {
                    let criteria_match = true;
                    Object.keys(criteria).forEach((criteria_field) => {
                        if (criteria_match
                            && (!(credential[criteria_field] !== undefined
                                && credential[criteria_field] === criteria[criteria_field]))
                        ) {
                            criteria_match = false;
                        }
                    });
                    return criteria_match;
                })
            );
    }

    /**
     * @param {Object} input
     * @return {Object}
     */
    updateCredential(input) {
        const {
            id,
        } = input;
        return new Promise((resolve, reject) => {
            if (id === undefined || id === null) {
                return reject(new Error('Cannot update with empty ID'));
            }
            return this.getCredentials()
                .then((credential_list) => {
                    const index = credential_list.findIndex((credential) => credential.id === id);
                    credential_list[index] = input;
                    return credential_list;
                })
                .then((data) => this.saveCredentials(data))
                .then(() => resolve(input));
        });

    }

}


GitCredentialRepository.instance = null;

module.exports = {
    GitCredentialRepository,
};

'use strict';

const {
    FileSystemRepository,
} = require('./FileSystemRepository');
const {
    ListObjectRepository,
} = require('./ListObjectRepository');

class GitCredentialRepository {

    /**
     * @static
     * @return {String}
     */
    static get GIT_CREDENTIAL_FILE_NAME() {
        return 'credentials.yml';
    }

    /* istanbul ignore next */
    /**
     * @return {GitCredentialRepository}
     */
    static getInstance() {
        if (GitCredentialRepository.instance === null) {
            GitCredentialRepository.instance = new GitCredentialRepository(
                FileSystemRepository.getInstance(),
                ListObjectRepository.getInstance()
            );
        }
        return GitCredentialRepository.instance;
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
    async search(criteria) {
        const credential_list = await this.getCredentials();
        return this.list_object_repository.search(criteria, credential_list);
    }

    /**
     * @param {Object} input
     * @return {Object}
     */
    async updateCredential(input) {
        const {
            id,
        } = input;

        if (id === undefined || id === null) {
            throw new Error('Cannot update with empty ID');
        }

        const credential_list = await this.getCredentials();
        const update_result = this.list_object_repository.update(id, input, credential_list);
        if (update_result === false) {
            throw new Error(`Cannot find element with ID: ${id}`);
        }
        await this.saveCredentials(update_result);
        return input;
    }

    /**
     * @param {Object} input
     * @return {Object}
     */
    deleteCredential(input) {
        const {
            id,
        } = input;
        return new Promise((resolve, reject) => {
            if (id === undefined || id === null) {
                return reject(new Error('Cannot delete with empty ID'));
            }
            return this.getCredentials()
                .then((credential_list) => {
                    const update_result = this.list_object_repository.delete(id, credential_list);
                    if (update_result !== false) {
                        return update_result;
                    }
                    return reject(new Error(`Cannot find element with ID: ${id}`));
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

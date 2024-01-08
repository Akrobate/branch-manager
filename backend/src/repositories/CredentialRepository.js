'use strict';

const {
    FileSystemRepository,
} = require('./FileSystemRepository');
const {
    ListObjectRepository,
} = require('./ListObjectRepository');

class CredentialRepository {

    /**
     * @static
     * @return {String}
     */
    static get GIT_CREDENTIAL_FILE_NAME() {
        return 'credentials.yml';
    }

    /* istanbul ignore next */
    /**
     * @return {CredentialRepository}
     */
    static getInstance() {
        if (CredentialRepository.instance === null) {
            CredentialRepository.instance = new CredentialRepository(
                FileSystemRepository.getInstance(),
                ListObjectRepository.getInstance()
            );
        }
        return CredentialRepository.instance;
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
        return CredentialRepository.GIT_CREDENTIAL_FILE_NAME;
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
    async deleteCredential(input) {
        const {
            id,
        } = input;

        if (id === undefined || id === null) {
            throw new Error('Cannot update with empty ID');
        }
        const credential_list = await this.getCredentials();
        const update_result = this.list_object_repository.delete(id, credential_list);
        if (update_result !== false) {
            throw new Error(`Cannot find element with ID: ${id}`);
        }
        await this.saveCredentials(update_result);
        return input;
    }

}


CredentialRepository.instance = null;

module.exports = {
    CredentialRepository,
};

'use strict';

const {
    GitCredentialRepository,
} = require('../repositories');

class CredentialService {


    /* istanbul ignore next */
    /**
     * @return {CredentialService}
     */
    static getInstance() {
        if (CredentialService.instance === null) {
            CredentialService.instance = new CredentialService(
                GitCredentialRepository.getInstance()
            );
        }
        return CredentialService.instance;
    }


    /**
     * @param {GitCredentialRepository} git_credential_repository
     */
    constructor(git_credential_repository) {
        this.git_credential_repository = git_credential_repository;
    }


    /**
     * @returns {Promise<Object>}
     */
    getCredentials() {
        return this.git_credential_repository.getCredentials();
    }


    /**
     * @param {Object} criteria
     * @returns {Promise<Object>}
     */
    search(criteria) {
        return this.git_credential_repository.search(criteria);
    }


    /**
     * @param {Integer} id
     * @param {Object} input
     * @returns {Promise<Object>}
     */
    updateCredential(id, input) {
        return this.git_credential_repository.updateCredential(
            {
                ...input,
                id,
            }
        );
    }

}

CredentialService.instance = null;

module.exports = {
    CredentialService,
};

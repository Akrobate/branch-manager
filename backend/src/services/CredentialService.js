'use strict';

const {
    GitCredentialRepository,
} = require('../repositories');

class CredentialService {

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
        return this.git_credential_repository
            .getCredentials();
    }

}

CredentialService.instance = null;

module.exports = {
    CredentialService,
};
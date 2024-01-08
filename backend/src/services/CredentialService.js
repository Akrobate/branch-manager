'use strict';

const {
    CredentialRepository,
} = require('../repositories');


/**
 * git credential fields
 * Git
 * - id
 * - name
 * - url
 * - git id_rsa file
 */
class CredentialService {


    /* istanbul ignore next */
    /**
     * @return {CredentialService}
     */
    static getInstance() {
        if (CredentialService.instance === null) {
            CredentialService.instance = new CredentialService(
                CredentialRepository.getInstance()
            );
        }
        return CredentialService.instance;
    }


    /**
     * @param {CredentialRepository} git_credential_repository
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

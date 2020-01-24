'use strict';

const {
    CredentialService,
} = require('../services');

class CredentialController {

    /**
     * @return {CredentialController}
     */
    static getInstance() {
        if (CredentialController.instance === null) {
            CredentialController.instance = new CredentialController(
                CredentialService.getInstance()
            );
        }
        return CredentialController.instance;
    }

    /**
     * @param {CredentialService} credential_service
     */
    constructor(credential_service) {
        this.credential_service = credential_service;
    }

    /**
     * @returns {Promise<Object>}
     */
    getCredentials() {
        return this.credential_service
            .getCredentials();
    }

}

CredentialController.instance = null;

module.exports = {
    CredentialController,
};

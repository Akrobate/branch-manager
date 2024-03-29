'use strict';

const {
    CredentialService,
} = require('../services');

class CredentialController {

    /* istanbul ignore next */
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
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<Object>}
     */
    async getCredentials(request, response) {
        const data = await this.credential_service.getCredentials();
        return response.json(data);
    }

}

CredentialController.instance = null;

module.exports = {
    CredentialController,
};

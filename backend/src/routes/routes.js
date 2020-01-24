'use strict';

const {
    Router,
} = require('express');

const {
    CredentialController,
} = require('../controllers');

const router = new Router();

const credential_controller = CredentialController.getInstance();

router.get('/credentials', (request, response) => credential_controller.getCredentials(request, response));

module.exports = router;

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
router.get('/projects', (request, response) => project_controller.getAllProjects(request, response));

module.exports = router;

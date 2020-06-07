'use strict';

const {
    Router,
} = require('express');

const {
    CredentialController,
} = require('../controllers');

const {
    ProjectController,
} = require('../controllers');

const router = new Router();

const credential_controller = CredentialController.getInstance();
const project_controller = ProjectController.getInstance();

router.get('/credentials', (request, response) => credential_controller.getCredentials(request, response));
router.get('/projects/:id', (request, response) => project_controller.getProject(request, response));
router.get('/projects/:id/process/update', (request, response) => project_controller.processProjectUpdateRepository(request, response));
router.get('/projects', (request, response) => project_controller.getAllProjects(request, response));

module.exports = router;

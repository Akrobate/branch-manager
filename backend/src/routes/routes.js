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

const {
    ProcessController,
} = require('../controllers');

const router = new Router();

const credential_controller = CredentialController.getInstance();
const project_controller = ProjectController.getInstance();
const process_controller = ProcessController.getInstance();

router.get('/credentials', (request, response) => credential_controller.getCredentials(request, response));

router.get('/projects/:id', (request, response) => project_controller.getProject(request, response));
router.post('/projects/:id/add-process/update', (request, response) => project_controller.addProcessProjectUpdateRepository(request, response));
router.get('/projects', (request, response) => project_controller.getAllProjects(request, response));

router.get('process/status', (request, response) => process_controller.getStatus(request, response));
router.post('process/start', (request, response) => process_controller.process(request, response));

module.exports = router;

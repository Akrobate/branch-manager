'use strict';

const {
    ProcessService,
} = require('../services');

class ProcessController {

    /* istanbul ignore next */
    /**
     * @return {ProcessController}
     */
    static getInstance() {
        if (ProcessController.instance === null) {
            ProcessController.instance = new ProcessController(
                ProcessService.getInstance()
            );
        }
        return ProcessController.instance;
    }

    /**
     * @param {ProcessService} process_service
     */
    constructor(process_service) {
        this.process_service = process_service;
    }

    /**
     * @param {Resquest} request
     * @param {Response} response
     * @returns {Promise<Object>}
     */
    getStatus(request, response) {
        return this.process_service
            .isProcessing()
            .then((is_processing) => response.json(
                {
                    status: {
                        is_processing,
                    },
                })
            );
    }

}

ProcessController.instance = null;

module.exports = {
    ProcessController,
};

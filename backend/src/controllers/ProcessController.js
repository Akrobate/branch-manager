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
    async getStatus(request, response) {
        const is_processing = await this.process_service.isProcessing();
        return response.json({
            status: {
                is_processing,
            },
        });
    }


    /**
     * @param {Resquest} request
     * @param {Response} response
     * @returns {Promise<Object>}
     */
    getProcessList(request, response) {
        const porcess_list = this.process_service.getProcessList();
        return response.json(
            {
                porcess_list,
            }
        );
    }


    /**
     * @param {Resquest} request
     * @param {Response} response
     * @returns {Promise<Object>}
     */
    async process(request, response) {
        const is_processing = await this.process_service.process();
        return response.json({
            status: {
                is_processing,
            },
        });
    }
}

ProcessController.instance = null;

module.exports = {
    ProcessController,
};

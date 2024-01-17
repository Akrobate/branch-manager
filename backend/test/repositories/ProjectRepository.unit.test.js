'use strict';

const {
    expect,
} = require('chai');

const {
    v4,
} = require('uuid');

const {
    ProjectRepository,
} = require('../../src/repositories');

const {
    copyTestCredentialData,
    cleanDataFolder,
    copyProjectFolderData,
} = require('../test_helpers/test_helpers');

describe('ProjectRepository unit test', () => {

    const project_repository = ProjectRepository.getInstance();
    const test_project_id = 'test_project_id';

    const project_test_file_data = {
        id: test_project_id,
        name: v4(),
        branch_flow: [],
        repository_list: [],
    };

    before(async () => {
        await cleanDataFolder();
        await copyTestCredentialData();
        await copyProjectFolderData();
    });


    it.only('getProject', async () => {
        const result = await project_repository.getProject(test_project_id);
        expect(result).to.be.an('Object');
        expect(result).to.have.property('id', 'test_project_id');
        expect(result).to.have.property('name', 'Test project');
        expect(result).to.have.property('branch_flow');
        expect(result.branch_flow).to.be.an('Array');
        expect(result.repository_list).to.be.an('Array');
    });


    it('getAllProjects', async () => {
        const result = await project_repository.getAllProjects();
        expect(result).to.be.an('Array');
        expect(result.length).to.be.gt(0);
        const found_result = result.find((item) => item.id === project_test_file_data.id);
        expect(found_result).to.be.an('Object');
        expect(found_result).to.have.property('id', project_test_file_data.id);
        expect(found_result).to.have.property('name', project_test_file_data.name);
        expect(found_result).to.have.property('branch_flow');
        expect(found_result.branch_flow).to.be.an('Array');
        expect(found_result.repository_list).to.be.an('Array');
    });


    it('getAllRepositories', async () => {
        const result = await project_repository.getAllRepositories(test_project_id);
        expect(result).to.be.an('Array');
    });


    it('updateProject', async () => {
        await project_repository.updateProject(
            test_project_id,
            {
                name: 'New project name',
            }
        );
    });

});


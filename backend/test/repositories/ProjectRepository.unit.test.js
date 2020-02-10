'use strict';

const fs = require('fs');

const yaml = require('yamljs');

const {
    expect,
} = require('chai');

const {
    mock,
} = require('sinon');

const {
    v4,
} = require('uuid');

const {
    ProjectRepository,
} = require('../../src/repositories');

describe('ProjectRepository unit test', () => {

    let project_repository = null;
    const test_project_id = v4();
    const project_test_file_name = 'project.yaml';
    const project_test_file_data = {
        id: test_project_id,
        name: v4(),
        branch_flow: [],
        repository_list: [],
    };
    const mocks = {};

    before(() => {
        fs.mkdirSync(`./data/projects/${test_project_id}`);
        fs.writeFileSync(`./data/projects/${test_project_id}/${project_test_file_name}`, yaml.stringify(project_test_file_data, 4));

        project_repository = ProjectRepository
            .getInstance();
        mocks.project_repository = mock(project_repository);
    });

    after(() => {
        fs.unlinkSync(`./data/projects/${test_project_id}/${project_test_file_name}`);
        fs.rmdirSync(`./data/projects/${test_project_id}`);
        mocks.project_repository.restore();
    });

    it('getInstance', () => {
        expect(project_repository).to.be.an.instanceOf(ProjectRepository);
        expect(project_repository).to.equal(ProjectRepository.getInstance());
    });

    it('getProject', (done) => {
        project_repository
            .getProject(test_project_id)
            .then((result) => {
                expect(result).to.be.an('Object');
                done();
            })
            .catch(done);
    });

    it('getAllRepositories', (done) => {
        project_repository
            .getAllRepositories(test_project_id)
            .then((result) => {
                expect(result).to.be.an('Array');
                done();
            })
            .catch(done);
    });

    it('updateProject', (done) => {
        project_repository
            .updateProject(
                test_project_id,
                {
                    name: 'New project name',
                }
            )
            .then(() => {
                done();
            })
            .catch(done);
    });

});


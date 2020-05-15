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
    const test_project_id = `test_${v4()}`;
    const project_test_file_name = 'project.yml';
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
                // console.log(result);
                expect(result).to.be.an('Object');
                expect(result).to.have.property('id', project_test_file_data.id);
                expect(result).to.have.property('name', project_test_file_data.name);
                expect(result).to.have.property('branch_flow');
                expect(result.branch_flow).to.be.an('Array');
                expect(result.repository_list).to.be.an('Array');
                done();
            })
            .catch(done);
    });

    it('getAllProjects', (done) => {
        project_repository
            .getAllProjects()
            .then((result) => {
                expect(result).to.be.an('Array');
                expect(result.length).to.be.gt(0);
                const [
                    first_result,
                ] = result;
                expect(first_result).to.be.an('Object');
                expect(first_result).to.have.property('id', project_test_file_data.id);
                expect(first_result).to.have.property('name', project_test_file_data.name);
                expect(first_result).to.have.property('branch_flow');
                expect(first_result.branch_flow).to.be.an('Array');
                expect(first_result.repository_list).to.be.an('Array');
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


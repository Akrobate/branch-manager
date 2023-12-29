'use strict';

const supertest = require('supertest');
const {
    mock,
} = require('sinon');

const {
    expect,
} = require('chai');

const {
    server,
} = require('../../src/app');

const {
    FileSystemRepository,
} = require('../../src/repositories');

const seeds_data_dir = `${__dirname}/../seeds/data/`;

const mocks = {};

describe('Projects controller', () => {

    beforeEach(() => {
        mocks.file_system_repository = mock(FileSystemRepository.getInstance());
    });

    afterEach(() => {
        mocks.file_system_repository.restore();
    });

    it('Should be able to list all projects', (done) => {
        mocks.file_system_repository
            .expects('getDataDir')
            .atLeast(1)
            .returns(seeds_data_dir);

        supertest(server)
            .get('/projects')
            .expect(200)
            .end((error, result) => {
                try {
                    expect(result).to.have.property('body');
                    expect(result.body).to.be.an('Array');
                    expect(result.body.length).to.be.gt(0);
                    const [
                        first_result,
                    ] = result.body;
                    expect(first_result).to.be.an('Object');
                    expect(first_result).to.have.property('id');
                    expect(first_result).to.have.property('name');
                    expect(first_result).to.have.property('branch_flow');
                    expect(first_result).to.have.property('repository_list');
                    expect(first_result.branch_flow).to.be.an('Array');
                    expect(first_result.repository_list).to.be.an('Array');
                    mocks.file_system_repository.verify();
                } catch (err) {
                    return done(err);
                }
                return done();
            });
    });

    it('Should be able get a project by project id', (done) => {
        mocks.file_system_repository
            .expects('getDataDir')
            .atLeast(1)
            .returns(seeds_data_dir);

        const project_id = 'test_project_id';
        supertest(server)
            .get(`/projects/${project_id}`)
            .expect(200)
            .end((error, result) => {
                try {
                    expect(error).to.equal(null);
                    expect(result).to.have.property('body');
                    const {
                        body,
                    } = result;
                    expect(body).to.be.an('Object');
                    expect(body).to.have.property('id');
                    expect(body).to.have.property('name');
                    expect(body).to.have.property('branch_flow');
                    expect(body).to.have.property('repository_list');
                    expect(body.branch_flow).to.be.an('Array');
                    expect(body.repository_list).to.be.an('Array');
                    mocks.file_system_repository.verify();
                } catch (err) {
                    return done(err);
                }
                return done();
            });
    });

});

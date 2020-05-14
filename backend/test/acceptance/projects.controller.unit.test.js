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
} = require('../../src/server');

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
        mocks.file_system_repository.expects('getDataDir').returns(seeds_data_dir);
        supertest(server)
            .get('/projects')
            .expect(200)
            .end((error, result) => {
                expect(error).to.equal(null);
                expect(result).to.have.property('body');
                // console.log(result.body);
                done();
            });
    });


    it('Should be able to list all projects', (done) => {
        supertest(server)
            .get('/projects')
            .expect(200)
            .end((error, result) => {
                expect(error).to.equal(null);
                expect(result).to.have.property('body');
                // console.log(result.body);
                done();
            });
    });


    it.skip('Should be able get a project by project id', (done) => {
        const project_id = 'test_project';
        supertest(server)
            .get(`/projects/${project_id}`)
            .expect(200)
            .end((error, result) => {
                expect(error).to.equal(null);
                expect(result).to.have.property('body');
                done();
            });
    });

});

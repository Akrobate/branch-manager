'use strict';

const supertest = require('supertest');

const {
    expect,
} = require('chai');

const {
    app,
} = require('../../src/app');

const {
    copyTestCredentialData,
    cleanDataFolder,
    copyProjectFolderData,
} = require('../test_helpers/test_helpers');

describe.only('Projects controller', () => {

    beforeEach(async () => {
        await cleanDataFolder();
        await copyTestCredentialData();
        await copyProjectFolderData();
    });


    it('Should be able to list all projects', (done) => {

        supertest(app)
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
                } catch (err) {
                    return done(err);
                }
                return done();
            });
    });

    it('Should be able get a project by project id', (done) => {

        const project_id = 'test_project_id';
        supertest(app)
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
                } catch (err) {
                    return done(err);
                }
                return done();
            });
    });

});

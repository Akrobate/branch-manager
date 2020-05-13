const supertest = require('supertest');

const {
    expect,
} = require('chai');

const {
    server,
} = require('../../src/server');

describe('Projects controller', () => {

    it('Should be able to list all projects', (done) => {
        supertest(server)
            .get('/projects')
            .expect(200)
            .end((error, result) => {
                expect(error).to.equal(null);
                expect(result).to.have.property('body');
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

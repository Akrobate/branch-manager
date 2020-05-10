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
});

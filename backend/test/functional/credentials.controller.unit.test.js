'use strict';

const supertest = require('supertest');
const {
    mock,
} = require('sinon');

const {
    expect,
} = require('chai');

const {
    app,
} = require('../../src/app');

const {
    FileSystemRepository,
} = require('../../src/repositories');

const seeds_data_dir = `${__dirname}/../seeds/data/`;

const mocks = {};

describe('Credentials controller', () => {

    beforeEach(() => {
        mocks.file_system_repository = mock(FileSystemRepository.getInstance());
    });

    afterEach(() => {
        mocks.file_system_repository.restore();
    });

    it('Should be able to list all credentials', (done) => {

        mocks.file_system_repository
            .expects('getDataDir')
            .atLeast(1)
            .returns(seeds_data_dir);

        supertest(app)
            .get('/credentials')
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
                    mocks.file_system_repository.verify();
                } catch (err) {
                    return done(err);
                }
                return done();
            });
    });


});

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

const {
    copyTestCredentialData,
    cleanDataFolder,
} = require('../test_helpers/test_helpers');

const seeds_data_dir = `${__dirname}/../data/`;

const mocks = {};

const file_system_repository = FileSystemRepository.getInstance();

describe.only('Credentials controller', () => {

    before(async () => {
        await cleanDataFolder();
        await copyTestCredentialData();
    });

    beforeEach(() => {
        mocks.file_system_repository = mock(file_system_repository);
    });

    afterEach(() => {
        mocks.file_system_repository.restore();
    });

    it('Should be able to list all credentials', (done) => {

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

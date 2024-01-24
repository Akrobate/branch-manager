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

const mocks = {};

describe('Credentials controller', () => {

    before(async () => {
        await cleanDataFolder();
        await copyTestCredentialData();
        await copyProjectFolderData();
    });


    it('Should be able to list all credentials', (done) => {

        supertest(app)
            .get('/credentials')
            .expect(200)
            .end((error, result) => {
                if (error) {
                    return done(error);
                }
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
                    expect(first_result).to.have.property('private_id_rsa_file');

                    mocks.file_system_repository.verify();
                } catch (err) {
                    return done(err);
                }
                return done();
            });
    });

});

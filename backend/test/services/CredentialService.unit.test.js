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
    GitCredentialRepository,
} = require('../../src/repositories');

const {
    CredentialService,
} = require('../../src/services');

describe('CredentialService unit test', () => {

    let credential_service = null;
    const mocks = {};

    before(() => {
        credential_service = CredentialService.getInstance();
        mocks.git_credential_repository = mock(GitCredentialRepository.getInstance());
    });

    it('getInstance', () => {
        expect(credential_service).to.be.an.instanceOf(CredentialService);
        expect(credential_service).to.equal(CredentialService.getInstance());
    });

    it('getCredentials', (done) => {

        mocks.git_credential_repository.expects('getCredentials')
            .once()
            .returns(Promise.resolve([]));

        credential_service
            .getCredentials()
            .then((data) => {
                expect(data).to.be.an('Array');
                done();
            });
    });

});


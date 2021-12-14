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
    GitCredentialRepository,
} = require('../../src/repositories');

describe('GitCredentialRepository unit test', () => {

    let git_credential_repository = null;
    const credential_test_file_name = 'credentials_test.yaml';
    const credential_test_file_data = [
        {
            key_1: v4(),
            key_2: v4(),
            key_3: v4(),
        },
        {
            key_1: v4(),
            key_2: v4(),
            key_3: v4(),
        },
    ];
    const mocks = {};

    before(() => {
        fs.writeFileSync(`./data/${credential_test_file_name}`, yaml.stringify(credential_test_file_data, 4));
        git_credential_repository = GitCredentialRepository
            .getInstance();
        mocks.git_credential_repository = mock(git_credential_repository);
    });

    after(() => {
        fs.unlinkSync(`./data/${credential_test_file_name}`);
    });

    beforeEach(() => {
        mocks.git_credential_repository = mock(git_credential_repository);
    });

    afterEach(() => {
        mocks.git_credential_repository.restore();
    });

    it('getGitCredentialFileName', () => {
        expect(git_credential_repository.getGitCredentialFileName()).to.equal('credentials.yml');
    });

    it('getCredentials', async (done) => {
        mocks.git_credential_repository.expects('getGitCredentialFileName')
            .once()
            .returns(credential_test_file_name);

        const data = await git_credential_repository.getCredentials();
        expect(data).to.deep.equal(credential_test_file_data);
        done();
    });

    it('saveCredentials', async (done) => {
        credential_test_file_data[0].key_1 = 'Updated_property';
        mocks.git_credential_repository.expects('getGitCredentialFileName')
            .twice()
            .returns(credential_test_file_name);

        await git_credential_repository.saveCredentials(credential_test_file_data);
        const data = await git_credential_repository.getCredentials();
        expect(data).to.deep.equal(credential_test_file_data);
        done();
    });
});


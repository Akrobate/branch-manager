'use strict';

const fs = require('fs');

const yaml = require('yamljs');

const {
    copyTestCredentialData,
    cleanDataFolder,
    copyProjectFolderData,
} = require('../test_helpers/test_helpers');

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
    CredentialRepository,
} = require('../../src/repositories');

describe('CredentialRepository unit test', () => {

    let credential_repository = null;
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
        credential_repository = CredentialRepository.getInstance();
        mocks.credential_repository = mock(credential_repository);
    });

    after(() => {
        fs.unlinkSync(`./data/${credential_test_file_name}`);
    });

    beforeEach(() => {
        mocks.credential_repository = mock(credential_repository);
    });

    afterEach(() => {
        mocks.credential_repository.restore();
    });

    it('getGitCredentialFileName', () => {
        expect(credential_repository.getGitCredentialFileName()).to.equal('credentials.yml');
    });

    it.only('getCredentials', async () => {
        mocks.credential_repository.expects('getGitCredentialFileName')
            .once()
            .returns(credential_test_file_name);

        const data = await credential_repository.getCredentials();
        expect(data).to.deep.equal(credential_test_file_data);
    });

    it('saveCredentials', async () => {
        credential_test_file_data[0].key_1 = 'Updated_property';
        mocks.credential_repository.expects('getGitCredentialFileName')
            .twice()
            .returns(credential_test_file_name);
        await credential_repository.saveCredentials(credential_test_file_data);
        const data = await credential_repository.getCredentials();
        expect(data).to.deep.equal(credential_test_file_data);
    });
});


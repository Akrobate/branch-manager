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
    CredentialRepository,
} = require('../../src/repositories');

describe.only('CredentialRepository unit test', () => {

    const credential_repository = CredentialRepository.getInstance();
    const credential_test_file_name = 'credentials_test.yaml';

    const mocks = {};

    before(async () => {
        await cleanDataFolder();
        await copyTestCredentialData();
        await copyProjectFolderData();
    });

    it('getGitCredentialFileName', () => {
        expect(credential_repository.getGitCredentialFileName()).to.equal('credentials.yml');
    });

    it.only('getCredentials', async () => {
        const data = await credential_repository.getCredentials();
        expect(data).to.deep.equal([
            {
                id: 'credential_id_1',
                name: 'crendial_name_1',
                private_id_rsa_file: './files/credential_id_1',
            },
            {
                id: 'credential_id_2',
                name: 'crendial_name_2',
                private_id_rsa_file: './files/credential_id_1',
            },
        ]);
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


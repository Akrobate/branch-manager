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

describe('CredentialRepository unit test', () => {

    const credential_repository = CredentialRepository.getInstance();

    before(async () => {
        await cleanDataFolder();
        await copyTestCredentialData();
        await copyProjectFolderData();
    });

    it('getGitCredentialFileName', () => {
        expect(credential_repository.getGitCredentialFileName()).to.equal('credentials.yml');
    });

    it('getCredentials', async () => {
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

        const credential_test_file_data = await credential_repository.getCredentials();
        expect(credential_test_file_data[0].id).to.equal('credential_id_1');

        credential_test_file_data[0].id = 'credential_id_1_updated';
        await credential_repository.saveCredentials(credential_test_file_data);
        const data = await credential_repository.getCredentials();
        expect(data[0].id).to.deep.equal('credential_id_1_updated');
    });
});


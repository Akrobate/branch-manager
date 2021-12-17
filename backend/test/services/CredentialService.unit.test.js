'use strict';

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

const {
    CredentialService,
} = require('../../src/services');

describe('CredentialService unit test', () => {

    let credential_service = null;
    const mocks = {};

    beforeEach(() => {
        credential_service = CredentialService.getInstance();
        mocks.git_credential_repository = mock(GitCredentialRepository.getInstance());
    });

    afterEach(() => {
        mocks.git_credential_repository.restore();
    });

    it('getCredentials', async (done) => {

        mocks.git_credential_repository.expects('getCredentials')
            .once()
            .returns(Promise.resolve([]));

        const data = await credential_service.getCredentials();
        mocks.git_credential_repository.verify();
        expect(data).to.be.an('Array');
        done();
    });

    describe('Search', () => {

        const credential_repository_data = [
            {
                key_1: v4(),
                key_2: v4(),
                key_3: v4(),
            },
            {
                key_1: v4(),
                key_2: 'SEARCH_VALUE_SHOULD_BE_FOUND',
                key_3: v4(),
            },
            {
                key_1: v4(),
                key_2: v4(),
                key_3: v4(),
            },
        ];

        it('Should be able to find with empty criteria', async () => {
            mocks.git_credential_repository.expects('getCredentials')
                .once()
                .returns(Promise.resolve(credential_repository_data));

            const data = await credential_service.search();
            expect(data).to.be.an('Array');
            expect(data).to.deep.equal(credential_repository_data);
        });


        it('Should result when elemnt found', async () => {
            mocks.git_credential_repository.expects('getCredentials')
                .once()
                .returns(Promise.resolve(credential_repository_data));

            const data = await credential_service.search({
                key_2: 'SEARCH_VALUE_SHOULD_BE_FOUND',
            });
            expect(data).to.be.an('Array');
            expect(data).to.deep.equal([
                credential_repository_data[1],
            ]);
            mocks.git_credential_repository.verify();
        });

        it('Should not find result if unknown criteria is setted', async () => {
            mocks.git_credential_repository.expects('getCredentials')
                .once()
                .returns(Promise.resolve(credential_repository_data));

            const data = await credential_service.search({
                key_2: 'SEARCH_VALUE_SHOULD_BE_FOUND',
                key_unknown: v4(),
            });
            expect(data).to.be.an('Array');
            expect(data).to.deep.equal([]);
        });

        it('Should return empty array if not found', (done) => {
            mocks.git_credential_repository.expects('getCredentials')
                .once()
                .returns(Promise.resolve(credential_repository_data));

            credential_service
                .search({
                    key_1: 'NOT_EXISTING_VALUE_IN_DATASET',
                })
                .then((data) => {
                    expect(data).to.be.an('Array');
                    expect(data).to.deep.equal([]);
                    mocks.git_credential_repository.verify();
                    done();
                })
                .catch(done);
        });
    });

    describe('Update', () => {

        const credential_repository_data = [
            {
                id: v4(),
                key_1: v4(),
            },
            {
                id: 'THE_ID_TO_UPDATE',
                key_1: v4(),
            },
        ];

        it('Should be able to update', (done) => {
            mocks.git_credential_repository.expects('getCredentials')
                .once()
                .returns(Promise.resolve(credential_repository_data));

            mocks.git_credential_repository.expects('saveCredentials')
                .once()
                .withArgs([
                    credential_repository_data[0],
                    {
                        id: 'THE_ID_TO_UPDATE',
                        key_1: 'UPDATED_KEY_1',
                    },
                ])
                .returns(Promise.resolve({
                    id: 'THE_ID_TO_UPDATE',
                    key_1: 'UPDATED_KEY_1',
                }));

            credential_service
                .updateCredential(
                    'THE_ID_TO_UPDATE',
                    {
                        key_1: 'UPDATED_KEY_1',
                    }
                )
                .then(() => {
                    mocks.git_credential_repository.verify();
                    done();
                });
        });

        it('Should not be able to update if ID not exist', (done) => {

            mocks.git_credential_repository.expects('getCredentials')
                .returns(Promise.resolve(credential_repository_data));

            credential_service
                .updateCredential(
                    'NOT_EXISTING_ID',
                    {
                        key_1: 'UPDATED_KEY_1',
                    }
                )
                .then(() => {
                    done('Should not be able to update');
                })
                .catch(() => {
                    try {
                        mocks.git_credential_repository.verify();
                    } catch (error) {
                        done(error);
                    }
                    done();
                });
        });

        it('Should not be able to update if ID is undefined', (done) => {

            credential_service
                .updateCredential(
                    undefined,
                    {
                        key_1: 'UPDATED_KEY_1',
                    }
                )
                .then(() => {
                    done('Should not be able to update');
                })
                .catch(() => {
                    done();
                });
        });

    });
});


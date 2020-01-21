'use strict';

const {
    expect,
} = require('chai');

const {
    FileSystemRepository,
} = require('../../src/repositories');

describe('FileSystemRepository unit test', () => {

    const file_system_repository = FileSystemRepository.getInstance();

    it('getInstance', () => {
        expect(file_system_repository).to.be.an.instanceOf(FileSystemRepository);
        expect(file_system_repository).to.equal(FileSystemRepository.getInstance());
    });

});


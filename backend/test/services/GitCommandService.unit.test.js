const {
    expect,
} = require('chai');

const {
    v4,
} = require('uuid');

const {
    GitService,
} = require('../../src/services');


describe('GitService unit test', () => {

    let git_command_service = null;

    before(() => {
        git_command_service = GitService
            .getInstance();
    });

    it('clone', () => {
        const url = v4();
        expect(git_command_service.clone(url)).to.equal(`git clone ${url}`);
    });

    it('checkout', () => {
        const branch = v4();
        expect(git_command_service.checkout(branch)).to.equal(`git checkout ${branch}`);
    });

});


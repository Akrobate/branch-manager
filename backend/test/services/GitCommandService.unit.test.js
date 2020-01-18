const {
    expect,
} = require('chai');

const {
    v4,
} = require('uuid');

const {
    GitCommandService,
} = require('../../src/services');


describe('GitCommandService unit test', () => {

    let git_command_service = null;

    before(() => {
        git_command_service = GitCommandService
            .getInstance();
    });

    it('getInstance', () => {
        expect(git_command_service).to.be.an.instanceOf(GitCommandService);
        expect(git_command_service).to.equal(GitCommandService.getInstance())
    });

    it('GitClone', () => {
        const url = v4();
        expect(git_command_service.gitClone(url)).to.equal(`git clone ${url}`);
    });

    it('gitCheckout', () => {
        const branch = v4();
        expect(git_command_service.gitCheckout(branch)).to.equal(`git checkout ${branch}`);
    });

});


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

    let git_service = null;

    before(() => {
        git_service = GitService
            .getInstance();
    });

    it('clone', () => {
        const url = v4();
        expect(git_service.cloneCommand(url)).to.equal(`git clone ${url}`);
    });

    it('checkout', () => {
        const branch = v4();
        expect(git_service.checkoutCommand(branch)).to.equal(`git checkout ${branch}`);
    });

    it('pull', () => {
        const branch = v4();
        const origin = v4();
        expect(git_service.pullCommand(origin, branch)).to.equal(`git pull ${origin} ${branch}`);
    });

    it('fetchAllPrune', () => {
        expect(git_service.fetchAllPruneCommand()).to.equal('git fetch --all --prune');
    });

});


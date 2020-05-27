const {
    expect,
} = require('chai');

const {
    v4,
} = require('uuid');

const {
    GitService,
} = require('../../src/services');

const git_service = GitService.getInstance();

describe('GitService Commands unit test', () => {

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

describe('GitService Utilitary methods', () => {

    it('getRepositoryDomainFromUrl - github.com', () => {
        expect(git_service
            .getRepositoryDomainFromUrl('https://github.com/Akrobate/branch-manager.git')
        ).to.equal('github.com');
    });

    it('getRepositoryDomainFromUrl - gitlab.com', () => {
        expect(git_service
            .getRepositoryDomainFromUrl('https://gitlab.com/Akrobate/artiom-fedorov-resume.git')
        ).to.equal('gitlab.com');
    });

    it('getRepositoryDomainFromUrl - framagit.org', () => {
        expect(git_service
            .getRepositoryDomainFromUrl('https://framagit.org/Akrobate/jekyll-openscad-theme.git')
        ).to.equal('framagit.org');
    });

});


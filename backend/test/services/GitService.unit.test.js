const {
    expect,
} = require('chai');

const {
    GitService,
} = require('../../src/services');

const git_service = GitService.getInstance();

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


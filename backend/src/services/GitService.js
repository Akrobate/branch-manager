'use strict';

const {
    GitRepository,
} = require('../repositories');

const public_suffix_list = require('psl');

class GitService {

    /* istanbul ignore next */
    /**
     * @return {GitService}
     */
    static getInstance() {
        if (GitService.instance === null) {
            GitService.instance = new GitService(
                GitRepository.getInstance()
            );
        }
        return GitService.instance;
    }


    /**
     * @param {GitRepository} git_repository
     */
    constructor(git_repository) {
        this.git_repository = git_repository;
    }


    /**
     * @param {String} url
     * @return {String}
     */
    cloneCommand(url) {
        return `git clone ${url}`;
    }


    /**
     * @param {String} branch
     * @return {String}
     */
    checkoutCommand(branch) {
        return `git checkout ${branch}`;
    }


    /**
     * @param {String} origin
     * @param {String} branch
     * @return {String}
     */
    pullCommand(origin, branch) {
        return `git pull ${origin} ${branch}`;
    }


    /**
     * @param {String} origin
     * @param {String} branch
     * @return {String}
     */
    fetchAllPruneCommand() {
        return 'git fetch --all --prune';
    }

    /**
     * @param {String} url
     * @return {String}
     */
    getRepositoryDomainFromUrl(url) {
        let hostname = '';
        if (url.indexOf('//') > -1) {
            // eslint-disable-next-line prefer-destructuring
            hostname = url.split('/')[2];
        } else {
            // eslint-disable-next-line prefer-destructuring
            hostname = url.split('/')[0];
        }

        // eslint-disable-next-line prefer-destructuring
        hostname = hostname.split(':')[0];

        // eslint-disable-next-line prefer-destructuring
        hostname = hostname.split('?')[0];

        return public_suffix_list.get(hostname);
    }

}

GitService.instance = null;

module.exports = {
    GitService,
};

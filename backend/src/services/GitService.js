'use strict';

class GitService {

    /* istanbul ignore next */
    /**
     * @return {GitService}
     */
    static getInstance() {
        if (GitService.instance === null) {
            GitService.instance = new GitService();
        }
        return GitService.instance;
    }


    /**
     * @param {String} url
     * @return {String}
     */
    clone(url) {
        return `git clone ${url}`;
    }


    /**
     * @param {String} branch
     * @return {String}
     */
    checkout(branch) {
        return `git checkout ${branch}`;
    }


    /**
     * @param {String} origin
     * @param {String} branch
     * @return {String}
     */
    pull(origin, branch) {
        return `git pull ${origin} ${branch}`;
    }


    /**
     * @param {String} origin
     * @param {String} branch
     * @return {String}
     */
    fetchAllPrune() {
        return 'git fetch --all --prune';
    }

}

GitService.instance = null;

module.exports = {
    GitService,
};

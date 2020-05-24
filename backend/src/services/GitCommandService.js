'use strict';

class GitCommandService {

    /* istanbul ignore next */
    /**
     * @return {GitCommandService}
     */
    static getInstance() {
        if (GitCommandService.instance === null) {
            GitCommandService.instance = new GitCommandService();
        }
        return GitCommandService.instance;
    }


    /**
     * @param {String} url
     * @return {String}
     */
    gitClone(url) {
        return `git clone ${url}`;
    }


    /**
     * @param {String} branch
     * @return {String}
     */
    gitCheckout(branch) {
        return `git checkout ${branch}`;
    }


    /**
     * @param {String} origin
     * @param {String} branch
     * @return {String}
     */
    gitPull(origin, branch) {
        return `git pull ${origin} ${branch}`;
    }


    /**
     * @param {String} origin
     * @param {String} branch
     * @return {String}
     */
    gitFetchAllPrune() {
        return 'git fetch --all --prune';
    }

}

GitCommandService.instance = null;

module.exports = {
    GitCommandService,
};

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

}

GitService.instance = null;

module.exports = {
    GitService,
};

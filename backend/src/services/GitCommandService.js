'use strict';

class GitCommandService {

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
}

GitCommandService.instance = null;

module.exports = {
    GitCommandService,
};

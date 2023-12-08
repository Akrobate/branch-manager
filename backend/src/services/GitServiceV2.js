'use strict';

const simpleGit = require('simple-git');


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
     * @param {*} path_to_git
     * @param {*} GIT_SSH_COMMAND
     * @return {object}
     */
    buildGitInstance(path_to_git, GIT_SSH_COMMAND) {
        return simpleGit(
            path_to_git,
            {
                binary: 'git',
            }
        )
            .env('GIT_SSH_COMMAND', GIT_SSH_COMMAND);
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
     * @param {String} path_to_git
     * @param {*} GIT_SSH_COMMAND
     * @return {String}
     */
    async checkoutCommand(branch, path_to_git, GIT_SSH_COMMAND) {
        const git = this.buildGitInstance(path_to_git, GIT_SSH_COMMAND);
        const result = await git.checkout(branch);
        return result;
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

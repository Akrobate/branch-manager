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

        let git = null;
        if (path_to_git) {
            git = simpleGit(
                path_to_git,
                {
                    binary: 'git',
                }
            );
        } else {
            git = simpleGit(
                {
                    binary: 'git',
                }
            );
        }

        return git.env('GIT_SSH_COMMAND', GIT_SSH_COMMAND);
    }


    /**
     * @param {String} ssh_key_file_path
     * @return {String}
     */
    generateSshCommand(ssh_key_file_path) {
        const GIT_SSH_COMMAND = `ssh -o StrictHostKeyChecking=no -i ${ssh_key_file_path}`;
        return GIT_SSH_COMMAND;
    }


    /**
     * @param {String} git_url
     * @param {String} path_to_git
     * @param {*} GIT_SSH_COMMAND
     * @return {String}
     */
    async cloneCommand(git_url, path_to_git, GIT_SSH_COMMAND) {
        const git = this.buildGitInstance(path_to_git, GIT_SSH_COMMAND);
        const result = await git.clone(git_url, path_to_git);
        return result;
    }


    /**
     * @param {String} branch
     * @param {String} path_to_git
     * @param {String} GIT_SSH_COMMAND
     * @return {String}
     */
    async checkout(branch, path_to_git, GIT_SSH_COMMAND) {
        const git = this.buildGitInstance(path_to_git, GIT_SSH_COMMAND);
        const result = await git.checkout(branch);
        return result;
    }


    /**
     * @param {String} path_to_git
     * @param {String} GIT_SSH_COMMAND
     * @return {String}
     */
    async fetchAllPrune(path_to_git, GIT_SSH_COMMAND) {
        const git = this.buildGitInstance(path_to_git, GIT_SSH_COMMAND);
        const result = await git.fetch({
            '--prune': null,
            '--all': null,
        });
        return result;
    }


    /**
     * @param {String} path_to_git
     * @param {String} GIT_SSH_COMMAND
     * @param {String} remote
     * @param {String} branch
     * @return {String}
     */
    async pull(path_to_git, GIT_SSH_COMMAND, remote, branch) {
        const git = this.buildGitInstance(path_to_git, GIT_SSH_COMMAND);
        const result = await git.pull(remote, branch);
        return result;
    }

}

GitService.instance = null;

module.exports = {
    GitService,
};

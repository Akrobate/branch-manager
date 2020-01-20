'use strict';

const yaml = require('yamljs');
const fsPromised = require('fs').promise;

class GitCredentialRepository {

    /**
     * @static
     * @return {String}
     */
    static get GIT_CREDENTIAL_FILE_NAME() {
        return 'credentials.yml';
    }

    /**
     * @return {GitCredentialRepository}
     */
    static getInstance() {
        if (GitCredentialRepository.instance === null) {
            GitCredentialRepository.instance = new GitCredentialRepository();
        }
        return GitCredentialRepository.instance;
    }

    /**
     * @return {String}
     */
    getCurrentFilenamePath() {
        return `${__dirname}../../data/${GitCredentialRepository.GIT_CREDENTIAL_FILE_NAME}`;
    }


    /**
     * @return {Object}
     */
    getCredentials() {
        return fsPromised
            .readFile(
                this.getCurrentFilenamePath(),
                'utf8'
            )
            .then((data) => yaml.parse(data));
    }

    /**
     * @param {Array} data
     * @return {Promise}
     */
    saveCredentials(data) {
        const yaml_string = yaml.stringify(data, 4);
        return fsPromised.writeFile(
            this.getCurrentFilenamePath(),
            yaml_string
        );
    }
}


GitCredentialRepository.instance = null;

module.exports = {
    GitCredentialRepository,
};

'use strict';

const yaml = require('yamljs');
const fs = require('fs');

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
        return new Promise(
            (resolve) => fs.readFile(
                this.getCurrentFilenamePath(),
                'utf8',
                resolve
            ))
            .then((data) => yaml.parse(data));
    }

    /**
     * @param {Array} data
     * @return {Promise}
     */
    saveCredentials(data) {
        const yaml_string = yaml.stringify(data, 4);
        return new Promise((resolve, reject) => fs
            .writeFile(
                this.getCurrentFilenamePath(),
                yaml_string,
                (error) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                })
        );
    }
}


GitCredentialRepository.instance = null;

module.exports = {
    GitCredentialRepository,
};

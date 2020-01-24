'use strict';

const fsPromised = require('fs').promises;
const yaml = require('yamljs');

class FileSystemRepository {

    /**
     * @return {FileSystemRepository}
     */
    static getInstance() {
        if (FileSystemRepository.instance === null) {
            FileSystemRepository.instance = new FileSystemRepository();
        }
        return FileSystemRepository.instance;
    }

    /**
     * @param {String} file
     * @return {Promise}
     */
    readFile(file) {
        return fsPromised
            .readFile(
                file,
                'utf8'
            );
    }

    /**
     * @param {String} file
     * @return {Promise}
     */
    readYamlFile(file) {
        return this
            .readFile(file)
            .then((data) => yaml.parse(data));
    }

    /**
     * @param {String} file
     * @param {String} data
     * @return {Promise}
     */
    writeFile(file, data) {
        return fsPromised.writeFile(
            file,
            data,
            'utf8'
        );
    }

    /**
     * @param {String} file
     * @param {Object} data
     * @return {Promise}
     */
    writeYamlFile(file, data) {
        const yaml_string = yaml.stringify(data, 4);
        return this.writeFile(file, yaml_string);
    }

    /**
     * @param {String} directory
     * @return {Promise}
     */
    createDirectory(directory) {
        return this.mkdir(directory);
    }

    /**
     * @param {String} directory
     * @return {Promise}
     */
    removeDirectory(directory) {
        return this.rmdir(directory);
    }
}


FileSystemRepository.instance = null;

module.exports = {
    FileSystemRepository,
};

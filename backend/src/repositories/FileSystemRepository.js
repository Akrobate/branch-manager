'use strict';

const fsPromised = require('fs').promises;
const yaml = require('yamljs');

class FileSystemRepository {

    /* istanbul ignore next */
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
     * @return {FileSystemRepository}
     */
    constructor() {
        this.data_dir = `${__dirname}/../../data/`;
    }


    /**
     * @param {String} data_dir
     * @returns {void}
     */
    setDataDir(data_dir) {
        this.data_dir = data_dir;
    }


    /**
     * @return {String}
     */
    getDataDir() {
        return this.data_dir;
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
    async readYamlFile(file) {
        const data = await this.readFile(file);
        return yaml.parse(data);
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
        return fsPromised.mkdir(directory);
    }

    /**
     * @param {String} directory
     * @return {Promise}
     */
    removeDirectory(directory) {
        return fsPromised.rmdir(directory);
    }


    /**
     * @param {String} directory
     * @return {Promise}
     */
    listDirectory(directory) {
        return fsPromised.readdir(directory);
    }


    /**
     * @param {String} path
     * @returns {Boolean}
     */
    exists(path) {
        return fs.existsSync(path);
    }
}


FileSystemRepository.instance = null;

module.exports = {
    FileSystemRepository,
};

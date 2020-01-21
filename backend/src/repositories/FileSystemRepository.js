'use strict';

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

}


FileSystemRepository.instance = null;

module.exports = {
    FileSystemRepository,
};

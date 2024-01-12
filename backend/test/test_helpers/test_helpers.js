'use strict';

// const fs = require('fs');
const fsPromises = require('fs').promises;


async function cleanDataFolder() {
    await fsPromises.unlink('./test/data/credentials.yml');
    await fsPromises.rm(
        './test/data/projects',
        {
            recursive: true,
            force: true,
        }
    );
}


async function copyTestCredentialData() {
    await fsPromises.copyFile('./test/seeds/data/credentials.yml', './test/data/credentials.yml');
}


async function copyProjectFolderData() {
    await fsPromises.cp(
        './test/seeds/data/projects',
        './test/data/projects',
        {
            recursive: true,
        }
    );
}


async function copyPrivateFolderData() {
    await fsPromises.cp(
        './test/seeds/data/privates',
        './test/data/privates',
        {
            recursive: true,
        }
    );
}

module.exports = {
    cleanDataFolder,
    copyTestCredentialData,
    copyProjectFolderData,
    copyPrivateFolderData,
};

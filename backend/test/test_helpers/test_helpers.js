'use strict';

// const fs = require('fs');
const fsPromises = require('fs').promises;


async function cleanDataFolder() {
    await fsPromises.unlink('./test/data/credentials.yml');
}


async function copyTestCredentialData() {
    await fsPromises.copyFile('./test/seeds/data/credentials.yml', './test/data/credentials.yml');
}


module.exports = {
    cleanDataFolder,
    copyTestCredentialData,
};

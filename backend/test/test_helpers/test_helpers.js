'use strict';

const fs = require('fs');

function cleanDataFolder() {
    const test_data_workdir = './test/data/';
    fs.unlinkSync(test_data_workdir);

}


module.exports = {
    cleanDataFolder,
};

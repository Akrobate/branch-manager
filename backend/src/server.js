'use strict';

const cors = require('cors');

// const {
//     configuration,
// } = require('./configuration');

const server = require('express')();
const routes = require('./routes/routes');

// Setting middlewares
server.use(cors());
server.use('/', routes);

module.exports = {
    server,
};

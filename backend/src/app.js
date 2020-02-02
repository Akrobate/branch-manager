'use strict';

const {
    logger,
} = require('./logger');

const {
    server,
} = require('./server');

server.listen(3000, () => logger.info('Branch manager server listening'));

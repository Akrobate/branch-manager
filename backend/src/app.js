/* istanbul ignore file */

'use strict';

const {
    logger,
} = require('./logger');

const {
    server,
} = require('./server');

const {
    configuration,
} = require('./configuration');

server.listen(
    configuration.getAppPort(),
    () => logger.info(`Branch manager server listening port: ${configuration.getAppPort()}`)
);


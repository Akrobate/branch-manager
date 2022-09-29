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

const server_port = configuration.getAppPort();

server
    .listen(server_port,
        () => {
            logger.info(`Branch manager server listening port: ${server_port}`
        })
    );


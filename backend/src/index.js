/* istanbul ignore file */

'use strict';

const {
    logger,
} = require('./logger');

const {
    app,
} = require('./app');

const {
    configuration,
} = require('./configuration/');

app.listen(configuration.server.port, () => {
    logger.info(`Branch manager server listening port: ${configuration.server.port}`);
});



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
} = require('./configuration');

app.listen(configuration.getAppPort(), () => {
    logger.info(`Branch manager server listening port: ${server_port}`);
});



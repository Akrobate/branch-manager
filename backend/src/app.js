'use strict';

const cors = require('cors');
const app = require('express')();
const routes = require('./routes/routes');

app.use(cors());
app.use('/', routes);

module.exports = {
    app,
};

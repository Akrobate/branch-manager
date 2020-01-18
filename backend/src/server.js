'use strict';

const cors = require('cors');

// const {
//     configuration,
// } = require('./configuration');
// const {
//     logger,
// } = require('./logger');

const app = require('express')();
const routes = require('./routes/routes');

// Setting middlewares
app.use(cors());
app.use('/', routes);

app.listen(3000, () => console.log('AssemblaBot listening on port: 3000');

/**
 * Main application routes
 */

'use strict';

const express = require('express');
const router = express.Router();

const beerAPI = require('./api/beer');
const containerAPI = require('./api/container');

module.exports = config => {

    // Insert routes below.
    router.use('/api/beers', beerAPI(config));
    router.use('/api/containers', containerAPI(config));

    return router;
};
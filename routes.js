/**
 * Main application routes
 */

'use strict';

const express = require('express');
const router = express.Router();

const beerAPI = require('./api/beer');

// Insert routes below

router.use('/api/beers', beerAPI);

module.exports = router;
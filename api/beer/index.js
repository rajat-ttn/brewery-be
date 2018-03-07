'use strict';

const express = require('express');
const controller = require('./beer.controller.js');

const router = express.Router();

router.get('/', controller.get);

module.exports = router;
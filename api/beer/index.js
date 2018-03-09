'use strict';

const express = require('express');
const router = express.Router();


module.exports = config => {

    const controller = require('./beer.controller.js')(config);

    router.get('/', controller.get);

    return router;
};
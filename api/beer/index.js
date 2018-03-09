'use strict';

const express = require('express');
const router = express.Router();

module.exports = function(config){

    const controller = require('./beer.controller.js')(config);

    router.get('/', controller.get);

    return router;
};
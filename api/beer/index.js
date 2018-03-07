'use strict';

const express = require('express');
const router = express.Router();


module.exports = function(io){

    const controller = require('./beer.controller.js')(io);

    router.get('/', controller.get);
    router.post('/:containerId/updateTemperature', controller.notifyUpdatedTemperature);

    return router;
};
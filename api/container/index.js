'use strict';

const express = require('express');
const router = express.Router();


module.exports = function(config){

    const controller = require('./container.controller.js')(config);

    router.post('/:containerId/updateTemperature', controller.notifyUpdatedTemperature);

    return router;
};
'use strict';

const express = require('express');
const router = express.Router();


module.exports = () => {

    const controller = require('./beer.controller.js')();

    router.get('/', controller.get);

    return router;
};
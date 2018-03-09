'use strict';

const beerService = {};

beerService.getAllBeers = (payload, callback) => {
    const allBeers = require('../../mockData/beers/beers.json');
    callback(null, allBeers);
};

module.exports = beerService;
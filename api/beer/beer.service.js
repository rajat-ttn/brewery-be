'use strict';

const beerService = {};

/**
 * Fetching beer list data
 * @param payload
 * @param callback
 */

beerService.getAllBeers = (payload, callback) => {
    const allBeers = require('../../mockData/beers/beers.json');
    callback(null, allBeers);
};

module.exports = beerService;
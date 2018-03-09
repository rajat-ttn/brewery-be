'use strict';

const beerService = require('./beer.service');

module.exports = config => {

    const beerController = {};

    beerController.get = (req, res) => {
        beerService.getAllBeers(null, (err, beers) => {
            if (err) { return res.json(err); }
            return res.send(beers);
        });
    };

    return beerController;
};
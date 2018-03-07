'use strict';

const beerService = require('./beer.service');
const beerController = {};

beerController.get = function (req, res){
    beerService.getAllBeers(null, function (err, beers) {
        if (err) { return res.json(err); }
        return res.send(beers);
    });
};

module.exports = beerController;
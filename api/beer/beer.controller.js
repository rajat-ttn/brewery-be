'use strict';

const beerService = require('./beer.service');

module.exports = config => {

    const beerController = {};

    /**
     * Fetch list of the beers
     * @param req
     * @param res
     */

    beerController.get = (req, res) => {
        beerService.getAllBeers(null, (err, beers) => {
            if (err) { return res.json(err); }
            return res.send(beers);
        });
    };

    return beerController;
};
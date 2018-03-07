'use strict';

const beerService = require('./beer.service');

module.exports = function(io){

    const beerController = {};

    beerController.get = function (req, res){
        beerService.getAllBeers(null, function (err, beers) {
            if (err) { return res.json(err); }
            return res.send(beers);
        });
    };

    beerController.notifyUpdatedTemperature = function (req, res){
        const containerId = req.params.containerId;
        const updatedTemperature = req.body.updatedTemperature;

        io.emit('BEER_TEMPERATURE_CHANGE', {
            containerId: containerId,
            updatedTemperature:updatedTemperature
        });

        res.send({success:true});
    };

    return beerController;
};
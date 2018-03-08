'use strict';

module.exports = function(config){
    const io = config.io;
    const containerController = {};

    containerController.notifyUpdatedTemperature = function (req, res){
        const containerId = req.params.containerId;
        const updatedTemperature = req.body.updatedTemperature;

        io.emit('CONTAINER_TEMPERATURE_CHANGE', {
            containerId: containerId,
            currentTemperature:updatedTemperature
        });

        res.send({success:true});
    };

    return containerController;
};
'use strict';

module.exports = function(config){
    const io = config.io;
    const containerController = {};

    containerController.notifyUpdatedTemperature = function (req, res){
        const containerId = req.params.containerId;
        const updatedTemperature = req.body.updatedTemperature;
        if(!Number.isFinite(updatedTemperature)){
            const error =  new Error('INVALID_TEMPERATURE');
            error.status = 400;
            throw error;
        }
        const emitData = {
            containerId,
            currentTemperature:updatedTemperature
        };
        io.emit('CONTAINER_TEMPERATURE_CHANGE', emitData);

        res.send(emitData);
    };

    return containerController;
};
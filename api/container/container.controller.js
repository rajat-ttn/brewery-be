'use strict';

module.exports = config => {
    const io = config.io;
    const containerController = {};

    containerController.notifyUpdatedTemperature = (req, res) => {
        const containerId = req.params.containerId;
        const updatedTemperature = req.body.updatedTemperature;

        const emitData = {
            containerId,
            currentTemperature:updatedTemperature
        };
        io.emit('CONTAINER_TEMPERATURE_CHANGE', emitData);

        res.send(emitData);
    };

    return containerController;
};
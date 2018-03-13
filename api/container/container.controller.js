'use strict';

const { ERROR_CONF, SENSOR_CONF } = require('../../constant');

module.exports = config => {
    const io = config.io;
    const containerController = {};

    /**
     * Emit socket event for updated temperature
     * @param req
     * @param res
     */

    containerController.notifyUpdatedTemperature = (req, res) => {
        const containerId = req.params.containerId;
        const updatedTemperature = req.body.updatedTemperature;
        if(!Number.isFinite(updatedTemperature)){
            const error =  new Error(ERROR_CONF.message);
            error.status = 400;
            throw error;
        }
        const emitData = {
            containerId,
            currentTemperature:updatedTemperature
        };
        io.emit(SENSOR_CONF.event, emitData);

        res.send(emitData);
    };

    return containerController;
};
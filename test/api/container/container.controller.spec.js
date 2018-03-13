const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
var assert = require('assert');

const { app } = require('../../../app');

describe('unit testing container.controller', () => {

    let containerController;
    let config = { io: { emit:sinon.spy() } };

    before(() => {
        containerController = require('../../../api/container/container.controller')(config);
    });

    it('notifyUpdatedTemperature should brodcast to io', () => {

        const res = { send: sinon.spy() };
        const req = {
            params: {
                containerId: 1
            },
            body: {
                updatedTemperature: 3
            }
        };

        containerController.notifyUpdatedTemperature(req, res);

        assert(res.send.calledWith({
            containerId: 1,
            currentTemperature: 3
        }));

        assert(config.io.emit.calledWith('CONTAINER_TEMPERATURE_CHANGE', {
            containerId: 1,
            currentTemperature: 3
        }));
    });
    
});
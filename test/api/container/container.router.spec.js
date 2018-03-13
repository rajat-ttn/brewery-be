const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const assert = require('assert');

const { app } = require('../../../app');

describe('unit testing container.router (container-->index.js)', () => {

    let beerData;
    let containerController = { notifyUpdatedTemperature: () => {} };
    let containerControllerInit = sinon.stub().returns(containerController);
    let config = { a:1 };

    let routerPost = sinon.spy();
    let expressStub = {
        Router: () => {
            return {
                post:routerPost
            }
        }
    };

    before(() => {
        proxyquire('../../../api/container/index', {
            './container.controller.js': containerControllerInit,
            'express':expressStub
        })(config);
    });

    it('containerController should get initialized correctly', () => {
        assert(containerControllerInit.calledWith(config));
    });

    it('container router should configure route to notifyUpdatedTemperature', () => {
        assert(routerPost.calledWith('/:containerId/updateTemperature', containerController.notifyUpdatedTemperature));
    });

});
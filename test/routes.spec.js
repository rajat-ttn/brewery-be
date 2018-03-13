const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const assert = require('assert');

const { app } = require('../app');

describe('unit testing main routes', () => {

    let beerRouter = {};
    let beerRouterInit = sinon.stub().returns(beerRouter);
    let containerRouter = {};
    let containerRouterInit = sinon.stub().returns(containerRouter);

    let config = { a:1 };

    let routerUse = sinon.spy();
    let expressStub = {
        Router: () => {
            return {
                use:routerUse
            }
        }
    };

    before(() => {
        proxyquire('../routes', {
            './api/beer': beerRouterInit,
            './api/container':containerRouterInit,
            'express': expressStub
        })(config);
    });

    it('sub api routers should get initialized correctly', () => {
        assert(beerRouterInit.calledWith(config));
        assert(containerRouterInit.calledWith(config));
    });

    it('main router should configure /api/beers route', () => {
        assert(routerUse.getCall(0).calledWith('/api/beers', beerRouter ));
    });

    it('main router should configure /api/containers route', () => {
        assert(routerUse.getCall(1).calledWith('/api/containers', containerRouter ));
    });

});
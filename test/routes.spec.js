const request = require('supertest');
const { app } = require('../app');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const assert = require('assert');

describe('unit testing main routes', function() {

    let beerRouter = {};
    let beerRouterInit = sinon.stub().returns(beerRouter);
    let containerRouter = {};
    let containerRouterInit = sinon.stub().returns(containerRouter);

    let config = {a:1};

    let routerUse = sinon.spy();
    let expressStub = {
        Router: function(){
            return {
                use:routerUse
            }
        }
    };

    before(()=>{
        proxyquire('../routes', {
            './api/beer': beerRouterInit,
            './api/container':containerRouterInit,
            'express': expressStub
        })(config);
    });

    it('sub api routers should get initialized correctly', function() {
        assert(beerRouterInit.calledWith({a:1}));
        assert(containerRouterInit.calledWith({a:1}));
    });

    it('main router should configure /api/beers route', function() {
        assert(routerUse.getCall(0).calledWith('/api/beers', beerRouter ));
    });

    it('main router should configure /api/containers route', function() {
        assert(routerUse.getCall(1).calledWith('/api/containers', containerRouter ));
    });

});
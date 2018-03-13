const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const assert = require('assert');

const { app } = require('../../../app');

describe('unit testing beer.router (beer-->index.js)', () => {

    let beerService;
    let beerData;
    let beerController = { get:() => {} };
    let beerControllerInit = sinon.stub().returns(beerController);
    let config = { a:1 };

    let routerGet = sinon.spy();
    let expressStub = {
        Router: () => {
            return {
                get:routerGet
            }
        }
    };

    before(() => {
        beerService = proxyquire('../../../api/beer/index', {
            './beer.controller.js': beerControllerInit,
            'express':expressStub
        })(config);
    });

    it('beerController should get initialized correctly', () => {
        assert(beerControllerInit.calledWith(config));
    });

    it('beer router should configure getAllBeers route', () => {
        assert(routerGet.calledWith('/', beerController.get ));
    });

});
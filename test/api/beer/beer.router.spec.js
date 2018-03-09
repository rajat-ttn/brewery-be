const request = require('supertest');
const { app } = require('../../../app');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const assert = require('assert');

describe('unit testing beer router', function() {

    let beerService;
    let beerData;
    let beerController = {get:function(){}};
    let beerControllerInit = sinon.stub().returns(beerController);
    let config = {a:1};

    let routerGet = sinon.spy();
    let expressStub = {
        Router: function(){
            return {
                get:routerGet
            }
        }
    };

    before(()=>{
        beerService = proxyquire('../../../api/beer/index', {
            './beer.controller.js': beerControllerInit,
            'express':expressStub
        })(config);
    });

    it('beerController should get initialized correctly', function() {
        assert(beerControllerInit.calledWith({a:1}));
    });

    it('beer router should get configured properly', function() {
        assert(routerGet.calledWith('/',beerController.get ));
    });

});
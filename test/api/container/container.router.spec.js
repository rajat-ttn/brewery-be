const request = require('supertest');
const { app } = require('../../../app');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const assert = require('assert');

describe('unit testing container router', function() {

    let beerData;
    let containerController = {notifyUpdatedTemperature:function(){}};
    let containerControllerInit = sinon.stub().returns(containerController);
    let config = {a:1};

    let routerPost = sinon.spy();
    let expressStub = {
        Router: function(){
            return {
                post:routerPost
            }
        }
    };

    before(()=>{
        proxyquire('../../../api/container/index', {
            './container.controller.js': containerControllerInit,
            'express':expressStub
        })(config);
    });

    it('containerController should get initialized correctly', function() {
        assert(containerControllerInit.calledWith({a:1}));
    });

    it('container router should get configured properly', function() {
        assert(routerPost.calledWith('/:containerId/updateTemperature',containerController.notifyUpdatedTemperature ));
    });

});
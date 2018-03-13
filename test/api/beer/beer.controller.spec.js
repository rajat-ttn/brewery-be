const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
var assert = require('assert');

const { app } = require('../../../app');

describe('unit testing beer.controller', () => {

    let beerController;
    let err = null;
    before(() => {
        const beerServiceStub = {
            getAllBeers: (payload, callback) => {
                callback(err, ['beer1', 'beer2']);
            }
        };
        beerController = proxyquire('../../../api/beer/beer.controller', {'./beer.service': beerServiceStub})();
    });

    it('get beerList should return a valid response', () => {
        const res = { send: sinon.spy() };
        const req = {};
        beerController.get(req, res);
        assert(res.send.calledWith(['beer1', 'beer2']));
    });

    it('get beerList should return error, if there is an error', () => {
        err = 'some_error';
        const res = { send: sinon.spy(), json: sinon.spy() };
        const req = {};
        beerController.get(req, res);
        assert(res.json.calledWith('some_error'));
    });
    
});
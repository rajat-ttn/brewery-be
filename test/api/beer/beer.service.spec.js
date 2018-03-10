const request = require('supertest');
const { app } = require('../../../app');
const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
var assert = require('assert');

describe('unit testing beer.service', function() {

    let beerService;
    let beerData;
    before(()=>{
        beerData = {
            beers:['beer1', 'beer2']
        };
        beerService = proxyquire('../../../api/beer/beer.service', {'../../mockData/beers/beers.json': beerData});
    });

    it('get beerList should return a valid response', function(done) {
        const res = {send: sinon.spy()};
        const req = {};
        beerService.getAllBeers(null, function(err, data){
            assert.equal(data, beerData);
            done()
        });
    });
});
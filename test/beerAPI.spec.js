const request = require('supertest');
const { app } = require('../app');
const { expect } = require('chai');

describe('testing :: /api/beers', function() {

    it('fetching all beers should work', function(done) {
        request(app)
            .get('/api/beers')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
                if (err) {
                    return done(err);
                }
                let output = res.body;
                expect(output).to.have.property('beers').that.is.an('array');
                done();
            });
    });

});
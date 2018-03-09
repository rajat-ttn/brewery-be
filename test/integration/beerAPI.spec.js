const request = require('supertest');
const { app } = require('../../app');
const { expect } = require('chai');

describe('testing :: /api/beers', () => {

    it('fetching all beers should work', done => {
        request(app)
            .get('/api/beers')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) {
                    return done(err);
                }
                let output = res.body;
                expect(output).to.have.property('beers').that.is.an('array');
                done();
            });
    });

});
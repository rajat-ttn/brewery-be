const request = require('supertest');
const { expect } = require('chai');

const { app } = require('../../app');

describe('integration testing  :: route --> /api/beers', () => {

    it('fetching all beers should work', done => {
        request(app)
            .get('/api/beers')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, (err, res) => {
                if (err) return done(err);
                let output = res.body;
                expect(output).to.have.property('beers').that.is.an('array');
                done();
            });
    });

});
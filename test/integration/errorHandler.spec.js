//reallyNeed = require('really-need');

const request = require('supertest');
const { expect } = require('chai');

let { app } = require('../../app');

describe('integration testing :: error handling', () => {

    it('should have error field in response for dev environment', done => {
        request(app)
            .get('/abc')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, (err, res) => {
                if (err) return done(err);
                let output = res.body;
                expect(output).to.have.property('error');
                expect(output).to.have.property('errorMsg');
                done();
            });
    });

    it('should NOT have error field in response for prod environment', done => {
        process.env.NODE_ENV = 'production';

        delete require.cache[require.resolve('../../app')];
        app = require('../../app').app;

        request(app)
            .get('/abc')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, (err, res) => {
                if (err) return done(err);
                let output = res.body;
                expect(output).not.to.have.property('error');
                expect(output).to.have.property('errorMsg');
                done();
            });
    });

});
//reallyNeed = require('really-need');

const request = require('supertest');
let { app } = require('../../app');
const { expect } = require('chai');

describe('integration testing :: error handling', function() {

    it('should have error field in response for dev environment', function(done) {
        request(app)
            .get('/abc')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, function(err, res) {
                if (err) {
                    return done(err);
                }
                let output = res.body;
                expect(output).to.have.property('error');
                expect(output).to.have.property('errorMsg');
                done();
            });
    });

    it('should NOT have error field in response for prod environment', function(done) {
        process.env.NODE_ENV = 'production';

        delete require.cache[require.resolve('../../app')];
        app = require('../../app').app;

        request(app)
            .get('/abc')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, function(err, res) {
                if (err) {
                    return done(err);
                }
                let output = res.body;
                expect(output).not.to.have.property('error');
                expect(output).to.have.property('errorMsg');
                done();
            });
    });

});
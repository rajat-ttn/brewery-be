const request = require('supertest');
const { app } = require('../app');
const { expect } = require('chai');

describe('testing :: /api/containers', () => {

    it('notifying container temperature should work', done => {
        request(app)
            .post('/api/containers/1/updateTemperature')
            .send({"updatedTemperature":32})
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err,res) => {
                expect(res.body).to.deep.equal({
                    containerId:'1',
                    currentTemperature:32
                });
                done();
            });
    });

});
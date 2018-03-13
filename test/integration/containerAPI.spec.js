const request = require('supertest');
const { expect } = require('chai');

const { app } = require('../../app');

describe('integration testing  :: routes --> /api/containers', () => {

    it('notifying container temperature should work if valid params received', done => {
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

    it('notifying container temperature should return error if valid params NOT received', done => {
        request(app)
            .post('/api/containers/1/updateTemperature')
            .send({"updatedTemperature": null })
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err,res) => {
                expect(res.body).to.have.property('errorMsg').to.equal('INVALID_TEMPERATURE');
                done();
            });
    });

});
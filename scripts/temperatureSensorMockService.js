const rp = require('request-promise');
const cron = require('node-cron');
const _ = require('lodash');

const postOptions = {
    method: 'POST',
    body: {
        updatedTemperature:null
    },
    json: true // Automatically stringifies the body to JSON
};

const beers = require('../mockData/beers/beers.json').beers;

const containers = _.chain(beers).map('containerId').value();

cron.schedule('*/10 * * * * *', function(){
    containers.forEach((containerId) => {
        notifyContainerTemperature(containerId);
    });
    console.log('cron task just got executed!');
});

function notifyContainerTemperature(id){
    const randomTemp = getRandomArbitrary(3,7);
    postOptions.uri =`http://localhost:3001/api/containers/${id}/updateTemperature`;
    postOptions.body.updatedTemperature = randomTemp;
    rp(postOptions);
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
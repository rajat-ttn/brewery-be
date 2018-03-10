'use strict';

const rp = require('request-promise');
const cron = require('node-cron');
const _ = require('lodash');
const amqp = require('amqplib/callback_api');

const { RABBITMQ_CONF, SENSOR_CONF } = require("../constant");
const beers = require('../mockData/beers/beers.json').beers;
const containers = _.chain(beers).map('containerId').value();

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
 
/**
 * Sends the containers temperature every 10 seconds
 */
const scheduler = (ch, QUEUE_CONF) => {
    cron.schedule(`*/${SENSOR_CONF.timer} * * * * *`, () => {
        containers.forEach(containerId => {
            const randomTemp = getRandomArbitrary(3,7);
            ch.sendToQueue(QUEUE_CONF.name, Buffer.from(JSON.stringify({
                containerId: containerId,
                currentTemperature: randomTemp,
            })));
        });
    });
};

/**
 * Creates a rabbit mq connection
 */
amqp.connect(RABBITMQ_CONF.host, (err, conn) => {
    conn.createChannel((err, ch) => {
        const QUEUE_CONF = RABBITMQ_CONF.queue;
        ch.assertQueue(QUEUE_CONF.name, { durable: QUEUE_CONF.durable, messageTtl: QUEUE_CONF.messageTtl });
        scheduler(ch, QUEUE_CONF);
    });
});

// const postOptions = {
//     method: 'POST',
//     body: {
//         updatedTemperature:null
//     },
//     json: true // Automatically stringifies the body to JSON
// };

// cron.schedule('*/10 * * * * *', function(){
//     containers.forEach((containerId) => {
//         notifyContainerTemperature(containerId);
//     });
//     console.log('cron task just got executed!');
// });

// function notifyContainerTemperature(id){
//     const randomTemp = getRandomArbitrary(3,7);
//     postOptions.uri =`http://localhost:3001/api/containers/${id}/updateTemperature`;
//     postOptions.body.updatedTemperature = randomTemp;
//     rp(postOptions);
// }
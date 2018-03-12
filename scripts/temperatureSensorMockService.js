'use strict';

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

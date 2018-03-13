"use strict";

const amqp = require('amqplib/callback_api');

const { RABBITMQ_CONF, SENSOR_CONF } = require("../constant");

/**
 * Messaging queue consuming data
 * @param io
 */

module.exports = io => {
    amqp.connect(RABBITMQ_CONF.host, (err, conn) => {
        conn.createChannel((err, ch) => {
            const QUEUE_CONF = RABBITMQ_CONF.queue;
            ch.assertQueue(QUEUE_CONF.name, { durable: QUEUE_CONF.durable, messageTtl: QUEUE_CONF.messageTtl });
            ch.consume(QUEUE_CONF.name, data => {
                io.emit(SENSOR_CONF.event, JSON.parse(data.content.toString()));
            }, {noAck: true});
        });
    });
};
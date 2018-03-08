const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
    conn.createChannel(function(err, ch) {
        const queueName = 'TEMPERATURE_QUEUE';
        ch.assertQueue(queueName, { durable: false, messageTtl: 1000 });
        ch.consume(queueName, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: true});
    });
});
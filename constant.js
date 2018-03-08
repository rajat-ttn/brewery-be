const RABBITMQ_CONF = {
    host: "amqp://localhost",
    queue: {
        name: 'GET_TEMPERATURE',
        durable: true,
        messageTtl: 1000,
    },
}

module.exports = {
    RABBITMQ_CONF
};
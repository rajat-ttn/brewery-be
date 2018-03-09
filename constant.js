const RABBITMQ_CONF = {
    host: "amqp://localhost",
    queue: {
        name: 'GET_TEMPERATURE',
        durable: true,
        messageTtl: 1000,
    },
};
const SENSOR_CONF = {
  timer: 10,
  event: 'CONTAINER_TEMPERATURE_CHANGE',
};

module.exports = {
    RABBITMQ_CONF,
    SENSOR_CONF
};
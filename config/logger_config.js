module.exports = {
  infoAMQP: {
    level: 'info',
    protocol: process.env.AMQP_PROTOCOL,
    username: process.env.AMQP_USERNAME,
    password: process.env.AMQP_PASSWORD,
    host: process.env.AMQP_HOST,
    port: process.env.AMQP_PORT,
    silent: true,
    exchangeName: 'log',
    exchangeType: 'fanout',
    durable: true
  },

  errorAMQP: {
    level: 'error',
    protocol: process.env.AMQP_PROTOCOL,
    username: process.env.AMQP_USERNAME,
    password: process.env.AMQP_PASSWORD,
    host: process.env.AMQP_HOST,
    port: process.env.AMQP_PORT,
    silent: true,
    exchangeName: 'log',
    exchangeType: 'fanout',
    durable: true
  },
};
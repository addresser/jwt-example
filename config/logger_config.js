module.exports = {
  protocol: process.env.AMQP_PROTOCOL,
  username: process.env.AMQP_USERNAME,
  password: process.env.AMQP_PASSWORD,
  host: process.env.AMQP_HOST,
  port: process.env.AMQP_PORT,
  silent: true,
  exchangeName: 'log',
  exchangeType: 'fanout',
  durable: true
};
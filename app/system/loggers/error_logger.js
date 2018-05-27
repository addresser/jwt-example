module.exports = (winston, winstonFastRabbitMQ, loggerConfig) => {

  let errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
      new winstonFastRabbitMQ(loggerConfig.errorAMQP),
    ],
    exitOnError: false,
  });

  return errorLogger;
};
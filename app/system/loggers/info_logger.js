module.exports = (winston, winstonFastRabbitMQ, loggerConfig) => {

  let infoLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winstonFastRabbitMQ(loggerConfig),
    ],
    exitOnError: false,
  });

  return infoLogger;
};
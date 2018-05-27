module.exports = (infoLogger, errorLogger, moment) => {

  return {
    login: (req, res, next) => {
      infoLogger.info(`[${moment().format('DD/MMM/YYYY:HH:mm:ss +SSS')}] ${req.user.name} logged.`);
    },

    register: (req, res, next) => {
      infoLogger.info(`[${moment().format('DD/MMM/YYYY:HH:mm:ss +SSS')}] ${req.body.name} registered.`);
    },

    error: (err, req, res, next) => {
      errorLogger.error(`[${moment().format('DD/MMM/YYYY:HH:mm:ss +SSS')}] ${err.message}`);

      next(err);
    },
  }
};
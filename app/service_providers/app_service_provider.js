/**
 * @description app_service_provider создает di-контейнер и регистрирует зависимости.
 * @module ./service_providers/app_service_provider
 * @param {Dizzy} DIContainerConstructor - конструктор di-контейнера.
 * @return {Dizzy} новый объект Dizzy
 */
module.exports = (DIContainerConstructor) => {

  let container = new DIContainerConstructor();

  /** Встроенные модули и загружаемые зависимости. */
  container.registerBulk({
    'ejs': 'ejs',
    'cors': 'cors',
    'crypto': 'crypto',
    'dotenv': 'dotenv',
    'helmet': 'helmet',
    'moment': 'moment',
    'winston': 'winston',
    'stampit': 'stampit',
    'express': 'express',
    'passport': 'passport',
    'mongoose': 'mongoose',
    'useStrict': 'use-strict',
    'bodyParser': 'body-parser',
    'hidden': 'mongoose-hidden',
    'bcrypt': 'mongoose-bcrypt',
    'createError': 'http-errors',
    'passportJWT': 'passport-jwt',
    'jsonWebToken': 'jsonwebtoken',
    'localStrategy': 'passport-local',
    'winstonFastRabbitMQ': 'winston-fast-rabbitmq'
  }).fromModule()
    .cached();

  /** Загружаемые зависимости, выполняемые как фабрики. */
  container.registerBulk({
    'validator': () => {
      const { check, body, validationResult } = require('express-validator/check/');
      const { matchedData, sanitize } = require('express-validator/filter');

      return {
        check: check, body: body, validationResult: validationResult,
        matchedData: matchedData, sanitize: sanitize
      }
    },
  }).asFactory()
    .cached();

  /** Модули приложения. */
  container.registerBulk({
    'jwtConfig': `${__dirname}/../../config/jwt_config`,
    'dbConfig': `${__dirname}/../../config/database_config`,
    'loggerConfig': `${__dirname}/../../config/logger_config`,
    'middlewareWrap': `${__dirname}/../system/middleware_wrap`,
    'validateMessages': `${__dirname}/../../resources/lang/ru/validate`,
  }).fromModule()
    .cached();

  /** Модули приложения, выполняемые как фабрики. */
  container.registerBulk({
    /** Модули ../ */
    'app': `${__dirname}/../core/app`,
    'jwtGenerate': `${__dirname}/../core/services/jwt_generate`,
    'jwtAuthenticator': `${__dirname}/../core/policies/jwt_authenticator`,
    'localAuthenticator': `${__dirname}/../core/policies/local_authenticator`,

    /** Модули ../database */
    'User': `${__dirname}/../database/models/user`,
    'dbConnect': `${__dirname}/../database/db_connect`,

    /** Модули ../middleware */
    'errorHandler': `${__dirname}/../middleware/error_handler`,
    'loggingMiddleware': `${__dirname}/../middleware/logging_middleware`,
    'registrationValidator': `${__dirname}/../middleware/validation/registration_validator`,
    'authenticationValidator': `${__dirname}/../middleware/validation/authentication_validator`,

    /** Модули ../routes и ...controllers */
    'userRouter': `${__dirname}/../routers/user_router`,
    'userController': `${__dirname}/../controllers/user_controller`,

    /** Модули ../system */
    'env': `${__dirname}/../system/env`,
    'infoLogger': `${__dirname}/../system/loggers/info_logger`,
    'errorLogger': `${__dirname}/../system/loggers/error_logger`,
    'connectErrorHandler': `${__dirname}/../system/connect_error_handler`,
  }).fromModule()
    .asFactory()
    .cached();

  /** Определение модуля-библиотеки валидации. */
  container.registerBulk({
    "ValidationMiddleware": (registrationValidator, authenticationValidator) => {
      return {
        registrationValidator: registrationValidator(),
        authenticationValidator: authenticationValidator(),
      };
    }
  }).asFactory()
    .cached();

  return container;
};

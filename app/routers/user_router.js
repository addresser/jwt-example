module.exports = (userController, localAuthenticator, ValidationMiddleware,
  errorHandler, express, middlewareWrap, loggingMiddleware) => {

  const userRouter = new express.Router();

  userRouter.post('/register', [
      ValidationMiddleware.registrationValidator.checkEmail,
      ValidationMiddleware.registrationValidator.checkName,
      ValidationMiddleware.registrationValidator.checkPassword,
      ValidationMiddleware.registrationValidator.checkValidationResult,
    ],
    middlewareWrap(userController.postRegister),
    loggingMiddleware.register,
    loggingMiddleware.error,
    errorHandler.catch,
  );

  userRouter.post('/login', [
      ValidationMiddleware.authenticationValidator.checkEmail,
      ValidationMiddleware.authenticationValidator.checkValidationResult,
    ],
    localAuthenticator.authenticate('local', { session: false }),
    middlewareWrap(userController.postLogin),
    loggingMiddleware.login,
    loggingMiddleware.error,
    errorHandler.catch,
  );

  return userRouter;
};


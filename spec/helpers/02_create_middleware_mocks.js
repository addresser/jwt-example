(() => {

  const primalLoggingMiddleware = container.resolve('loggingMiddleware');
  let loggingMiddlewareMocks = jasmine.createSpyObj('loggingMiddlewareMocks', [ 'login', 'register', 'error' ]);

  let primalValidationMiddleware = container.resolve('ValidationMiddleware');
  let ValidationMiddlewareMocks = jasmine.createSpyObj('ValidationMiddlewareMocks', [
    'checkName', 'checkEmail',
    'checkPassword', 'checkValidationResult',
  ]);
  ValidationMiddlewareMocks.checkName.and.callFake((req, res, next) => { next(); });
  ValidationMiddlewareMocks.checkEmail.and.callFake(async (req, res, next) => { next(); });
  ValidationMiddlewareMocks.checkPassword.and.callFake((req, res, next) => { next(); });
  ValidationMiddlewareMocks.checkValidationResult.and.callFake((req, res, next) => { next(); });

  container.registerBulk({
    loggingMiddleware: loggingMiddlewareMocks,
    ValidationMiddleware: {
      registrationValidator: {
        checkName: ValidationMiddlewareMocks.checkName,
        checkEmail: ValidationMiddlewareMocks.checkEmail,
        checkPassword: ValidationMiddlewareMocks.checkPassword,
        checkValidationResult: ValidationMiddlewareMocks.checkValidationResult,
      },
      authenticationValidator: {
        checkEmail: ValidationMiddlewareMocks.checkEmail,
        checkValidationResult: ValidationMiddlewareMocks.checkValidationResult,
      },
    }
  }).asValue();

  global.primalModules = {
    loggingMiddleware: primalLoggingMiddleware,
    validationMiddleware: primalValidationMiddleware
  };
})();

const User = container.resolve('User');
const httpMocks = require('node-mocks-http');
const validator = container.resolve('validator');
const dbConnect = container.resolve('dbConnect');

let user, userData, reqMock, resMock, nextMock;

describe("registration validator", () => {
  beforeEach(async () => {
    await dbConnect.connection;
    await dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();

    reqMock = httpMocks.createRequest({
      method: 'POST',
      body: {}
    });

    resMock = httpMocks.createResponse();
    nextMock = jasmine.createSpy('next');
  });

  beforeEach(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  describe("when receive incorrect registration data", function () {
    it("should put error messages into request object", async () => {
      await primalModules.validationMiddleware.registrationValidator.checkName(reqMock, resMock, nextMock);
      await primalModules.validationMiddleware.registrationValidator.checkEmail(reqMock, resMock, nextMock);
      await primalModules.validationMiddleware.registrationValidator.checkPassword(reqMock, resMock, nextMock);

      let errors  = validator.validationResult(reqMock);

      expect(errors.mapped()).toBeNonEmptyObject();
    });
  });

  describe("when receive correct registration data", function () {
    beforeEach(async () => {
      reqMock.body = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      };
    });

    it("should not put error messages into request object", async () => {
      await primalModules.validationMiddleware.registrationValidator.checkName(reqMock, resMock, nextMock);
      await primalModules.validationMiddleware.registrationValidator.checkEmail(reqMock, resMock, nextMock);
      await primalModules.validationMiddleware.registrationValidator.checkPassword(reqMock, resMock, nextMock);

      let errors  = validator.validationResult(reqMock);

      expect(errors.mapped()).toBeEmptyObject();
    });
  });
});

const User = container.resolve('User');
const httpMocks = require('node-mocks-http');
const validator = container.resolve('validator');
const dbConnect = container.resolve('dbConnect');

let userData, user, reqMock, resMock, nextMock;

describe("authentication validator", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();
    user = new User(userData);
    await user.save();

    resMock = httpMocks.createResponse();
    nextMock = jasmine.createSpy('next');
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  describe("when receive incorrect authentication data", function () {
    beforeAll(() => {
      reqMock = httpMocks.createRequest({
        method: 'POST',
        body: {
          email: userData.email,
        }
      });
    });

    it("should put error messages into request object", async () => {
      await primalModules.validationMiddleware.authenticationValidator.checkEmail(reqMock, resMock, nextMock);
      await primalModules.validationMiddleware.authenticationValidator.checkPassword(reqMock, resMock, nextMock);

      let errors  = validator.validationResult(reqMock);

      expect(errors.mapped()).toBeNonEmptyObject();
    });

  });

  describe("when receive correct authentication data", function () {
    beforeAll(() => {
      reqMock = httpMocks.createRequest({
        method: 'POST',
        body: {
          email: userData.email,
          password: userData.password,
        }
      });
    });

    it("should not put error messages into request object", async () => {
      await primalModules.validationMiddleware.authenticationValidator.checkEmail(reqMock, resMock, nextMock);
      await primalModules.validationMiddleware.authenticationValidator.checkPassword(reqMock, resMock, nextMock);

      let errors  = validator.validationResult(reqMock);

      expect(errors.mapped()).toBeEmptyObject();
    });
  });
});

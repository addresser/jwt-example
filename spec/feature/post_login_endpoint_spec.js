const User = container.resolve('User');
const rpn = require('request-promise-native');
const jwt = container.resolve('jsonWebToken');
const dbConnect = container.resolve('dbConnect');
const loggingMiddleware = container.resolve('loggingMiddleware');
const ValidationMiddleware = container.resolve('ValidationMiddleware');

let user, userData, options, response;

describe("POST /login endpoint", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();
    user = new User(userData);
    await user.save();
  });

  beforeAll(async () => {
    options = {
      uri: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/login`,
      resolveWithFullResponse: true,
      json: true,
      body: {
        email: userData.email,
        password: userData.password,
      }
    };

    response = await rpn.post(options);
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should send new jwt token with user data", () => {
    let payload = jwt.decode(response.body.token);

    expect(payload).toEqual(jasmine.objectContaining({name: userData.name, email: userData.email}));
  });

  it("should send status 200", () => {
    expect(response.statusCode).toEqual(200);
  });

  it("should call authentication validation middleware", async () => {
    expect(ValidationMiddleware.authenticationValidator.checkEmail).toHaveBeenCalled();
    expect(ValidationMiddleware.authenticationValidator.checkValidationResult).toHaveBeenCalled();
  });

  it("should call authentication log middleware", async () => {
    expect(loggingMiddleware.login).toHaveBeenCalled();
  });
});

const User = container.resolve('User');
const jwt = container.resolve('jsonWebToken');
const rpn = require('request-promise-native');
const dbConnect = container.resolve('dbConnect');
const loggingMiddleware = container.resolve('loggingMiddleware');
const ValidationMiddleware = container.resolve('ValidationMiddleware');

let userData, options, response;

describe("POST /register endpoint", () => {
  beforeAll(async() => {
    await dbConnect.connection;
    await dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();
  });

  beforeAll(async () => {
    options = {
      uri: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/register`,
      resolveWithFullResponse: true,
      json: true,
      body: userData
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

  it("should send status 200", async () => {
    expect(response.statusCode).toEqual(200);
  });

  it("should create new document in database", async () => {
    let user = await User.findOne({ email: userData.email });

    expect(user).toEqual(jasmine.objectContaining({name: userData.name, email: userData.email}));
  });

  it("should call registration validation middleware", async () => {
    expect(ValidationMiddleware.registrationValidator.checkName).toHaveBeenCalled();
    expect(ValidationMiddleware.registrationValidator.checkEmail).toHaveBeenCalled();
    expect(ValidationMiddleware.registrationValidator.checkPassword).toHaveBeenCalled();
    expect(ValidationMiddleware.registrationValidator.checkValidationResult).toHaveBeenCalled();
  });

  it("should call registration log middleware", async () => {
    expect(loggingMiddleware.register).toHaveBeenCalled();
  });
});

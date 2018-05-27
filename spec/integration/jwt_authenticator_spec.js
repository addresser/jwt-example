const User = container.resolve('User');
const httpMocks = require('node-mocks-http');
const dbConnect = container.resolve('dbConnect');
const jwtGenerate = container.resolve('jwtGenerate');
const jwtAuthenticator = container.resolve('jwtAuthenticator');

let userData, user, reqMock, resMock, nextMock, token;

describe("jwt authentication validator", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();
    user = new User(userData);
    await user.save();

    token = jwtGenerate(userData.name, userData.email);
    reqMock = httpMocks.createRequest({
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
    resMock = httpMocks.createResponse();
    nextMock = jasmine.createSpy('next');
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should find registered user by jwt token", (done) => {
    jwtAuthenticator.authenticate('jwt',  (err, usr, info) => {
      expect(usr).toEqual(jasmine.objectContaining({name: userData.name, email: userData.email}));

      done();
    })(reqMock, resMock);
  });
});

const User = container.resolve('User');
const httpMocks = require('node-mocks-http');
const dbConnect = container.resolve('dbConnect');
const localAuthenticator = container.resolve('localAuthenticator');

let userData, user, reqMock, resMock, nextMock;

describe("local authentication validator", () => {
  beforeAll(async () => {
    await dbConnect.connection;
    await dbConnect.connection.db.dropDatabase();

    userData = dataGenerators.user();
    user = new User(userData);
    await user.save();

    reqMock = httpMocks.createRequest({
      method: 'POST',
      body: {
        email: userData.email,
        password: userData.password,
      }
    });
    resMock = httpMocks.createResponse();
    nextMock = jasmine.createSpy('next');
  });

  afterAll(async () => {
    await dbConnect.connection.db.dropDatabase();
  });

  it("should find registered user", (done) => {
    localAuthenticator.authenticate('local', { session: false }, (err, usr) => {
      expect(usr).toEqual(jasmine.objectContaining({name: userData.name, email: userData.email}));

      done();
    })(reqMock, resMock);
  });
});

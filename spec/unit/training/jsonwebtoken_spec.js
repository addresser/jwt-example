const jsonWebToken = container.resolve('jsonWebToken');

let userData;

describe("jsonwebtoken", () => {

  beforeAll(async () => {
    userData = dataGenerators.user();
  });

  it("should make jwt token with coded user data", async () => {
    let token  = jsonWebToken.sign({
      name: userData.name,
      email: userData.email,
    }, process.env.JWT_SECRET, { expiresIn: 60 });

    let payload = jsonWebToken.decode(token);

    expect(payload).toEqual(jasmine.objectContaining({ name: userData.name, email: userData.email }));
  });
});

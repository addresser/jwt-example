(() => {
  const faker = require('faker');

  let dataGenerators = {
    user() {
      return {
        name: faker.internet.userName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password(),
      }
    }
  };


  global.dataGenerators = dataGenerators;
})();
(() => {
  const Dizzy = require('dizzy');
  const appServiceProvider = require(`${__dirname}/../../app/service_providers/app_service_provider`);

  let container = appServiceProvider(Dizzy);

  global.container = container;
})();
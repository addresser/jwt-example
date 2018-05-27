const Dizzy = require('dizzy');
const appServiceProvider = require(`${__dirname}/service_providers/app_service_provider`);

let container = appServiceProvider(Dizzy);
let app = container.resolve('app');

module.exports = app;

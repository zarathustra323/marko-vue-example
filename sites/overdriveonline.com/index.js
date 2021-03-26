const startServer = require('@parameter1/base-cms-marko-web/start-server');

const routes = require('./server/routes');
const siteConfig = require('./config/site');
const coreConfig = require('./config/core');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  coreConfig,
  siteConfig,
  routes,
}).then(() => log('Website started!')).catch(e => setImmediate(() => { throw e; }));

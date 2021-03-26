const withContent = require('@parameter1/base-cms-marko-web/middleware/with-content');

const index = require('./templates/index');
const content = require('./templates/content');

const contentPage = require('./graphql/content-page-fragment');

module.exports = (app) => {
  app.get('/', (_, res) => { res.marko(index); });

  app.get('/*?:id(\\d{8})*', withContent({
    template: content,
    queryFragment: contentPage,
  }));
};

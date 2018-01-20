// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const ElasticsearchWrapper = require('../services/search/elasticsearch.wrapper');

module.exports = function(options = {}) { // eslint-disable-line no-unused-vars
  return function(hook) {
    const app = hook.app;
    const es = new ElasticsearchWrapper(app);
    if (es.isEnabled()) {
      app.debug('on contribution added:');
      try {
        let data = hook.result;
        app.debug('hook.data:' + JSON.stringify(data));
        es.add(data);
      } catch(error) {
        app.error('Error:' + error);
      }
    }

    return Promise.resolve(hook);
  };
};
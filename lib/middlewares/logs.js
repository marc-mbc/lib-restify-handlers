'use strict';
module.exports = {
  initialize: function (api, config) {
    if (!config.log || typeof config.log !== 'object') throw new Error('You must set a log config object');
    if (config.log.access_log) {
      api.use(function (request, response, next) {
        request.log.info({req: request}, 'Incomming request');
        return next();
      });
    }
  }
};
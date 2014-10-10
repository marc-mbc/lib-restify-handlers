'use strict';
module.exports = {
  initialize: function (api, config, log) {
    if (!config.log || typeof config.log !== 'object') throw new Error('You must set a log config object');
    if (config.log.access_log) {
      api.pre(function (request, response, next) {
        log.info({req: request}, 'New Request');
        return next();
      });
    }
  }
};
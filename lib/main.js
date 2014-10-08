'use strict';
/**
 * Prepare the restify config
 * @param  {Object} workerData Object with the worker
 * @param  {Object} config Config object of the micro-service
 * @param  {Object} log    Log object (lib-log)
 * @param  {Object} utils  Utils object
 */
module.exports.init = function(api, ms, config, log) {
  if (!config || typeof config !== 'object') throw 'You must set a config object';
  if (!log || typeof log !== 'object') throw 'You must set a log object (bunyan)';
  if (!api || typeof api !== 'object') throw 'You must set a api object (restify)';
  var worker = require('./middlewares/worker.js');
  var restify = require('./middlewares/restify.js');
  var validation = require('./middlewares/validation.js');
  worker.initialize(api, ms || {}, log);
  restify.initialize(api, config);
  validation.initialize(api);
};

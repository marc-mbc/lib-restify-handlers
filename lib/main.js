'use strict';
/**
 * Prepare the restify config
 * @param  {Object} workerData Object with the worker
 * @param  {Object} config Config object of the micro-service
 * @param  {Object} log    Log object (lib-log)
 * @param  {Object} utils  Utils object
 */
module.exports.init = function(workerData, config, log) {
  var worker = require('./middlewares/worker.js');
  var restify = require('./middlewares/restify.js');
  var validation = require('./middlewares/validation.js');
  worker.initialize(api, workerData, log);
  restify.initialize(api, config);
  validation.initialize(api);
}

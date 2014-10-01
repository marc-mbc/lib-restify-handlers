'use strict';
module.exports = {
  initialize: function (api, config) {
    if (!config.throttle || typeof config.throttle !== 'object') throw 'You must set a throttle config object';
    var restify = require('restify');
    if (config.throttle.activated) {
      api.use(restify.throttle({
        burst: config.throttle.burst,
        rate: config.throttle.rate,
        ip: config.throttle.ip, // throttle based on source ip address /32
        username: config.throttle.username, // throttle based on req.username
        xff: config.throttle.xff // throttle based on a /32 (X-Forwarded-For)
      }));
    }
    api.use(restify.acceptParser(api.acceptable));
    api.use(restify.dateParser());
    api.use(restify.queryParser());
    api.use(restify.fullResponse());
    api.use(restify.gzipResponse());
    api.pre(restify.pre.sanitizePath());
  }
};
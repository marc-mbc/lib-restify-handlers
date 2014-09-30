'use strict';
module.exports = {
  initialize: function (api) {
    var restifyValidator = require('restify-validator');
    api.use(restifyValidator);
  }
};
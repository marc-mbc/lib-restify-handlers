'use strict';
module.exports = {
  initialize: function (api, ms, log) {
    
    if (!ms.graceful_shutdown) {
      ms.graceful_shutdown = function (cb) {
        // Do stuff to close connections like DB, flush cache... and then run cb when finish
        cb();
      };
    }

    var utils = require('lib-restify-utils').init(log);

    function createDomain(req, res) {
      var domain = require('domain');
      var d = domain.create();
      d.on('error', function (err) {
        // Note: we're in dangerous territory!
        // By definition, something unexpected occurred,
        // which we probably didn't want.
        // Anything can happen now!  Be very careful!
        try {
          // try to send an error to the request that triggered the problem
          log.fatal('Fatal Error', {stack: err.stack, err: err});
          if (res) utils.sendInternalError(res, 'Response on error');
          process.send('Error');
          api.close(function () {
            ms.graceful_shutdown(function () {
              process.send('Stopped');
            });
          });
        }
        catch (err2) {
          // oh well, not much we can do at this point.
          if (ms.worker) console.error('Error disconnecting a worker ' + ms.worker.id + '!', err2.stack);
          else console.error(err2.stack);
          console.error('Original Error before disconnect: ', err.stack);
        }
      });
      if (req) d.add(req);
      if (res) d.add(res);
      return d;
    }
  
    api.removeAllListeners('uncaughtException');
    if (ms.worker) {
      var already_shutdown = false;
      process.on('message', function(msg) {
        if(msg == 'shutdown' && !already_shutdown) {
          already_shutdown = true;
          process.send('Stopping');
          api.close(function () {
            ms.graceful_shutdown(function () {
              process.send('Stopped');
            });
          });  
        }
      });
    }

    api.use(function (req, res, next) {
      var d = createDomain(req, res);
      d.run(function () {
        next();
      });
    });

  }
};
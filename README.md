<h1>Restify handlers</h1>
<p>
	This module contains some basic configuration and handlers and worker behaviour for restify. It can be improved in order to follow a common standard for the whole company
</p>

<p>
	In order to init the module it's needed a bunyan instance as a log, a config instance and a restify instance. 
	Optionally It can get a ms config object from cluster module. 
	For the moment, you can add a worker and a graceful shutdown function to close active connections before kill a worker.
</p>
<p>
	Example ms config object:
	<pre>
	var ms = {
      worker: worker,
      graceful_shutdown: function (cb) {
        // Do stuff to close connections like DB, flush cache... and then run cb when finish
        cb();
      }
    };
    </pre>
<p>Example: require('lib-restify-handlers').init(api, worker, config, log); </p>

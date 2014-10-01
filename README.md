<h1>Restify handlers</h1>
<p>
	This module contains some basic configuration and handlers and worker behaviour for restify. It can be improved in order to follow a common standard for the whole company
</p>

<p>
	In order to init the module it's needed a bunyan instance as a log, a config instance and a restify instance. Optionally It can get a worker object from cluster module
</p>
<p>Example: require('lib-restify-handlers').init(api, worker, config, log); </p>

/**
 * IPE Module entry point
 *
 * @author flaminio
 * @author The Carbono.io Team
 * @date 2015-09-03
 */
'use strict';

// External imports
var express    = require('express');
var consign    = require('consign');
var bodyParser = require('body-parser');

// Default port 
var IPE_PORT = 8000;

var app = express();

// Json parser for post data
app.use(bodyParser.json());

// Consign configuration
consign({cwd: 'app'})
    .include('controllers')
    .include('routes')
    .into(app);

var server = app.listen(IPE_PORT, function () {
    console.log('INFO MOGNO IPE listening at http://%s:%s', 
		server.address().address, server.address().port);
});

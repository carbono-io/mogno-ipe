'use strict';

var express    = require('express');
var consign    = require('consign');
var bodyParser = require('body-parser');

var IPE_PORT = 12739;

var app = express();
app.use(bodyParser.json());

consign({cwd: process.cwd() + '/app'})
    .include('controllers')
    .include('routes')
    .into(app);

var server = app.listen(IPE_PORT, function () {
    console.log('Ipe listening at http://%s:%s',
		server.address().address, server.address().port);
});

module.exports.app = app;
module.exports.server = server;

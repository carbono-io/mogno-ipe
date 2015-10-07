'use strict';
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var consign = require('consign');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var routes;
sinon.defaultConfig.useFakeTimers = false;
chai.should();
chai.use(sinonChai);

describe('test routes', function () {
    before(function () {
        app.use(bodyParser.json());
        consign({cwd: process.cwd() + '/app'})
            .include('controllers')
            .include('routes')
            .into(app);

        routes = require('../app/routes/machine.js');
    });

    after(function () {
    });

    describe('Routes', function () {
        it('should respond', function () {
            var route1 = 'POST-/paas/machines';
            var route2 = 'GET-/paas/machines/:token';

            var listroutes = '';
            app._router.stack.forEach(function (a) {
                var route = a.route;
                if (route) {
                    route.stack.forEach(function (r) {
                        var method = r.method.toUpperCase();
                        listroutes += method + '-' + route.path + ' ';
                    });
                }
            });
            listroutes.indexOf(route1).should.be.at.least(0);
            listroutes.indexOf(route2).should.be.at.least(0);
        });
    });
});

'use strict';
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');

var NogueiraProducerClient = require('../app/lib/nogueira-producer-client');

sinon.defaultConfig.useFakeTimers = false;
chai.should();
chai.use(sinonChai);

var ipe;

describe('test routes', function () {
    before(function () {
        ipe = require('../');

        ipe.app.controllers.machine.createNogueiraProducerClient = function () {
            return new NogueiraProducerClient('localhost:3000/nog');
        };
    });

    after(function () {
        ipe.server.close();
    });

    function requestNewMachine(data, callback) {
        var request = require('request');
        var CJM = require('carbono-json-messages');
        var cjm = new CJM({id: 'x1', apiVersion: '1.0.0'});

        cjm.setData(data);

        var url = 'http://localhost:' + ipe.server.address().port +
            '/paas/machines';

        var load = {
            url: url,
            json: cjm.toObject(),
        };

        var _cb = function (err, httpResponse) {
            callback(httpResponse);
        };
        request.post(load, _cb);
    }

    function requestGetStatus(token, callback) {

        var request = require('request');

        var url = 'http://localhost:' + ipe.server.address().port +
            '/paas/machines/' + token;

        var load = {url: url};

        var _cb = function (err, httpResponse) {
            callback(httpResponse);
        };
        request.get(load, _cb);
    }

    describe('Services', function () {
        it('Create machine - success', function (done) {
            var data = {
                id: 'y2',
                items: [
                    {
                        component: 'crud-basic',
                        route: 'foo',
                        environment: 'DEV',
                    },
                ],
            };

            requestNewMachine(data, function (httpResponse) {
                httpResponse.statusCode.should.be.equals(201);
                var obj = httpResponse.body;
                obj.apiVersion.should.be.equals('0.0.1');
                obj.data.id.should.be.equals('TOKEN-0001');

                done();
            });
        });

        it('Create machine - fail', function (done) {
            var data = {
                id: 'y2',
                items: [
                    {
                        component: 'crud-basic2',
                        route: 'foo',
                        environment: 'DEV',
                    },
                ],
            };

            requestNewMachine(data, function (httpResponse) {
                httpResponse.statusCode.should.be.equals(400);
                var obj = httpResponse.body;
                obj.apiVersion.should.be.equals('0.0.1');
                obj.error.should.not.be.null;
                done();
            });
        });

        it('Get Token Status - success', function (done) {
            requestGetStatus('TOKEN-0001', function (httpResponse) {
                httpResponse.statusCode.should.be.equals(200);
                var obj = JSON.parse(httpResponse.body);
                obj.apiVersion.should.be.equals('0.0.1');
                obj.data.items[0].status.should.be.equals(0);

                done();
            });
        });

        it('Get Token Status - fail', function (done) {
            requestGetStatus('TOKEN-0002', function (httpResponse) {
                httpResponse.statusCode.should.be.equals(400);
                var obj = JSON.parse(httpResponse.body);
                obj.apiVersion.should.be.equals('0.0.1');
                obj.error.should.not.be.null;
                done();
            });
        });
    });
});

'use strict';
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
sinon.defaultConfig.useFakeTimers = false;
chai.should();
chai.use(sinonChai);

var NogueiraProducerClient = require('../app/lib/nogueira-producer-client.js');

describe('nogueira-producer-client', function () {
    before(function () {
    });

    after(function () {
    });

    describe('helper functions - createPayloadForData', function () {
        it('success2', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var data = {
                id: 'id1234',
                items: [
                    {
                        component: 'crud-basic',
                        route: 'foo',
                        environment: 'DEV',
                    },
                ],
            };

            var promiss = npc.createMachineRequest(data);

            promiss
                .then(function (token) {
                    token.should.be.equals('TOKEN-0001');
                })
                .done(function () {
                    done();
                });
        });

        it('fail 400', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var data = {
                id: 'id1234',
                items: [
                    {
                        component: 'crud-basic2',
                        route: 'foo',
                        environment: 'DEV',
                    },
                ],
            };

            var promiss = npc.createMachineRequest(data);

            promiss
                .catch(function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(400);
                })
                .done(function () {
                    done();
                });
        });

        it('fail 404', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var data = {
                id: 'id1234',
                items: [
                    {
                        component: 'crud-basic3',
                        route: 'foo',
                        environment: 'DEV',
                    },
                ],
            };

            var promiss = npc.createMachineRequest(data);

            promiss
                .catch(function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(404);
                })
                .done(function () {
                    done();
                });
        });

        it('fail 500', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var data = {
                id: 'id1234',
                items: [
                    {
                        component: 'crud-basic4',
                        route: 'foo',
                        environment: 'DEV',
                    },
                ],
            };

            var promiss = npc.createMachineRequest(data);

            promiss
                .catch(function (err) {
                    err.should.not.be.null;
                    err.should.be.equals(500);
                })
                .done(function () {
                    done();
                });
        });
    });

    describe('helper functions - getStatusForToken', function () {
        it('success', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');
            var token = 'TOKEN-0001';
            var promiss = npc.getStatusForToken(token);

            promiss
                .then(function (status) {
                    status.should.be.equals('OK');
                })
                .done(function () {
                    done();
                });
        });

        it('fail 400', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var token = 'TOKEN-0002';
            var promiss = npc.getStatusForToken(token);

            promiss
                .catch (function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(400);
                })
                .done(function () {
                    done();
                });
        });

        it('fail 404', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var token = 'TOKEN-0003';
            var promiss = npc.getStatusForToken(token);


            promiss
                .catch(function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(404);
                })
                .done(function () {
                    done();
                });
        });

        it('fail 500', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var token = 'TOKEN-0004';
            var promiss = npc.getStatusForToken(token);

            promiss
                .catch(function (err) {
                    err.should.not.be.null;
                    err.should.be.equals(500);
                })
                .done(function () {
                    done();
                });
        });
    });
});

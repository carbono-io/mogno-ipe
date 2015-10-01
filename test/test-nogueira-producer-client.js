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

            var promise = npc.createMachineRequest(data);
            promise
                .then(function (token) {
                    token.should.be.equals('TOKEN-0001');
                    done();
                })
                .catch(function (err) {console.log(err);});

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

            var promise = npc.createMachineRequest(data);

            promise
                .catch(function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(400);
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

            var promise = npc.createMachineRequest(data);

            promise
                .catch(function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(404);
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

            var promise = npc.createMachineRequest(data);

            promise
                .catch(function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(500);
                    done();
                });
        });
    });

    describe('helper functions - getStatusForToken', function () {
        it('success', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');
            var token = 'TOKEN-0001';
            var promise = npc.getStatusForToken(token);

            promise
                .then(function (status) {
                    status.should.be.equals('OK');
                    done();
                });
        });

        it('fail 400', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var token = 'TOKEN-0002';
            var promise = npc.getStatusForToken(token);

            promise
                .catch(function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(400);
                    done();
                });
        });

        it('fail 404', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var token = 'TOKEN-0003';
            var promise = npc.getStatusForToken(token);

            promise
                .catch(function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(404);
                    done();
                });
        });

        it('fail 500', function (done) {
            var npc = new NogueiraProducerClient('http://localhost:3000/nog');

            var token = 'TOKEN-0004';
            var promise = npc.getStatusForToken(token);

            promise
                .catch(function (err) {
                    err.should.not.be.null;
                    err.code.should.be.equals(500);
                    done();
                });
        });
    });
});

'use strict';
// Native imports
// var net = require('net');

// Extern Imports
var sinon = require('sinon');
var chai = require('chai');
chai.should();

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5000;
var trucoprotocol = require('../app/protocol/trucoprotocol.js');

var ioClient = require('socket.io-client');

// var game = require('../app/lib/game.js');

var sinonChai = require('sinon-chai');
sinon.defaultConfig.useFakeTimers = false;

chai.use(sinonChai);

describe('Example Stubbing net.Socket', function () {
    before(function () {
        server.listen(port, function () {
            console.log('Truco last round on port %d', port);
        });

        // Routing
        app.use(express.static(__dirname + '/public'));
        trucoprotocol.createRoutes(io);

        // mock = sinon.mock(game);
        // mock.expects('play');
    });

    after(function () {
        console.log('Truco last end');
        io.close();
    });

    // var mock;
    before(function () {
        server.listen(port, function () {
            console.log('Truco last round on port %d', port);
        });

        // Routing
        app.use(express.static(__dirname + '/public'));
        trucoprotocol.createRoutes(io);

        // mock = sinon.mock(game);
        // mock.expects('play');
    });

    after(function () {
        console.log('Truco last end');
        io.close();
    });

    describe('foo', function () {
        it('Should broadcast new user to all users', function (done) {

            /*
             sinon.stub(game, 'play', function (action) {
             // C , data, callback) {
             if (action === 'start') {
             return {
             action: 'truco',
             data: {msg: 'vai ladrao', card: 'Teste1'},
             };
             } else if (action === 'seis') {
             return {
             action: 'nove',
             data: {msg: 'vai ladrao', card: 'Teste2'},
             };
             }
             });*/

            console.log('new user to all users');
            var client1 = ioClient.connect('http://localhost:5000');

            client1.on('truco', function (data) {
                console.log('teste');
                console.log(data);
                client1.emit('seis', '');
            });

            client1.on('nove', function (data) {
                console.log('teste2');
                console.log(data);
                // mock.verify();
                done();
                client1.disconnect();
            });
        });
    });

});

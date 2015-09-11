'use strict';

var NogueiraProducerClient = require('../lib/nogueira-producer-client');

module.exports = function () {
    /**
     * Sends machine creation request to
     * Nogueira Producer.
     * @function
     *
     * @param {Object} Request
     * @param {Object} Response
     */
    var create = function (req, res) {
        var npc = new NogueiraProducerClient();

        var promiseCreateMachine = npc.createMachineRequest(req.body.data);

        promiseCreateMachine
            .then(function (token) {
                res.json({token: token});
            }, function (err) {
                res.json({err: err});
            });
    };

    /**
     * Retrieves the given token's status.
     *
     * @function
     *
     * @param {Object} Request
     * @param {Object} Response
     */
    var getTokenStatus = function (req, res) {
        var token = req.params.token;
        var npc = new NogueiraProducerClient();

        var promiseTokenStatus = npc.getStatusForToken(token);

        promiseTokenStatus
            .then(function (status) {
                res.json({status: status});
            }, function (err) {
                res.json({err: err});
            });
    };

    var machineController = {
        create: create,
        getTokenStatus: getTokenStatus,
    };

    return machineController;
};
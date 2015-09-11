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
     *
     * @returns {string} Token which can be used to verify
     *					 if the requested machine is already
     *				     up or not.
     *
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

    var machineController = {
        create: create,
    };

    return machineController;
};
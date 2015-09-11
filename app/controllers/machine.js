'use strict';

var NogueiraProducerClient = require('../lib/nogueira-producer-client');
var pjson                  = require('../../package.json');
var CJM                    = require('carbono-json-messages');

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
                var data = {
                    token: token,
                };

                res.status(201).json(createJsonResponse(data, undefined));
            }, function (err) {
                res
                    .status(err.code || 500)
                    .json(createJsonResponse(undefined, err));
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
                var data = {
                    status: status,
                };

                res.status(200).json(createJsonResponse(data, undefined));
            }, function (err) {
                res
                    .status(err.code || 500)
                    .json(createJsonResponse(undefined, err));
            });
    };

    /**
     * Creates a response following Google's
     * JSON style guide (which is implemented
     * by the Carbono JSON Messages).
     *
     * @param {Object} Object with relevant data
     *                 to be put in the response.
     * @param {Object} Errors that may have occurred
     *                 along the way.
     * 
     * @returns {Object} Response object following
     *                   Google's JSON style guide.
     */
    var createJsonResponse = function (data, error) {
        var cjm = new CJM({apiVersion: pjson.version});

        if (data) {
            cjm.setData(data);
        } else {
            cjm.setError(error);
        }

        return cjm.toObject();
    };

    var machineController = {
        create: create,
        getTokenStatus: getTokenStatus,
    };

    return machineController;
};
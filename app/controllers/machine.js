'use strict';

var NogueiraProducerClient = require('../lib/nogueira-producer-client');
var pjson = require('../../package.json');
var CJM = require('carbono-json-messages');

module.exports = function () {

    var createNogueiraProducerClient = function () {
        return new NogueiraProducerClient();
    };

    /**
     * Sends machine creation request to
     * Nogueira Producer.
     * @function
     *
     * @param {Object} Request
     * @param {Object} Response
     */
    var create = function (req, res) {
        var npc = machineController.createNogueiraProducerClient();

        var promiseCreateMachine = npc.createMachineRequest(req.body.data);

        promiseCreateMachine
            .then(function (token) {
                var data = {
                    id: token,
                };

                res.status(201).json(createSuccessResponse(data));
            }, function (err) {
                res.status(err.code).json(createErrorResponse(err));
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
        var npc = machineController.createNogueiraProducerClient();

        var promiseTokenStatus = npc.getStatusForToken(token);

        promiseTokenStatus
            .then(function (status) {
                var data = {
                    id: token,
                    items: [
                        {
                            status: status,
                        },
                    ],
                };
                res.status(200).json(createSuccessResponse(data));
            }, function (err) {
                res.status(err.code).json(createErrorResponse(err));
            });
    };

    /**
     * Creates a success response, following Google's
     * JSON style guide.
     *
     * @param {Object} Object with relevant data
     *                 to be put in the response.
     *
     * @returns {CarbonoJsonResponse} Response object following
     *                                Google's JSON style guide.
     */
    var createSuccessResponse = function (data) {
        var cjm = new CJM({apiVersion: pjson.version});
        cjm.setData(data);

        return cjm.toObject();
    };

    /**
     * Creates an error response, following Google's
     * JSON style guide.
     *
     * @param {int} Error code
     * @param {string} Error message
     * @param {Object} Error object
     *
     * @returns {CarbonoJsonResponse} Response object following
     *                                Google's JSON style guide.
     */
    var createErrorResponse = function (err) {
        var cjm = new CJM({apiVersion: pjson.version});
        cjm.setError(err);
        return cjm.toObject();
    };

    var machineController = {
        create: create,
        getTokenStatus: getTokenStatus,
        createNogueiraProducerClient: createNogueiraProducerClient,
    };

    return machineController;
};

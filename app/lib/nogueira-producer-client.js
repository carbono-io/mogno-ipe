'use strict';

var request = require('request');
var q       = require('q');
var CJM     = require('carbono-json-messages');
var pjson   = require('../../package.json');
var path    = require('path');

/**
 * Interface used to comunicate with our
 * Nogueira Producer.
 * @class
 */
var NogueiraProducerClient = function () {
    var PRODUCER_BASE_URL = 'http://localhost:9471';
    var ENDPOINT_MACHINES = '/machines';

    /**
     * Makes a request to the Nogueira Producer
     * so it can create a machine deployment
     * request.
     *
     * @function
     * @param {Object} Object with relevant data
     *                 to be forwarded.
     *
     * @returns {Promise} Promise that resolves
     *                    in case the Nogueira Producer
     *                    returns a token and rejects
     *                    in case we receive an error back.
     */
    this.createMachineRequest = function (data) {
        var deffered = q.defer();

        // Nogueira producer does not need the route
        // property. So we'll remove it from the payload.
        // And instead of component, it requires an
        // imageName property
        data.items.forEach(function (machine) {
            machine.imageName = machine.component;

            delete machine.route;
            delete machine.component;
        });

        var payload = createPayloadForData(data);
        var options = createBaseRequestForEndpoint(ENDPOINT_MACHINES);

        options.json = payload;

        request.post(options, function (err, res, body) {
            if (err) {
                deffered.reject(err);

                return;
            }

            deffered.resolve(body);
        });

        return deffered.promise;
    };

    /**
     * Retrieves the status of the token by
     * making a request to Nogueira Storage.
     *
     * @param {string} Token whose status is to be
     *                 retrieved.
     */
    this.getStatusForToken = function (token) {
        var deffered = q.defer();

        var endpoint = path.join(ENDPOINT_MACHINES, token);
        var options = createBaseRequestForEndpoint(endpoint);

        request.get(options, function (err, res, body) {
            if (err) {
                deffered.reject(err);

                return;
            }

            deffered.resolve(body);
        });

        return deffered.promise;
    };

    /**
     * Creates an object that will be used to make
     * a request. The object contains basic properties
     * like the url and content type.
     *
     * @param {string} Endpoint that is to be concatenated
     *                 to the base url to form the complete uri.
     *
     * @returns {Object} Request object.
     */
    function createBaseRequestForEndpoint(endpoint) {
        return {
            url: PRODUCER_BASE_URL + (endpoint || ''),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    }

    /**
     * Creates a payload according to Google JSON
     * Style Guide.
     *
     * @function
     * @param {Object} Object containing relevant data
     *
     * @returns {Object} Object representation of the
     *                   JSON payload.
     */
    function createPayloadForData(data) {
        var cjm = new CJM({apiVersion: pjson.version});
        cjm.setData(data);

        return cjm.toObject();
    }
};

module.exports = NogueiraProducerClient;
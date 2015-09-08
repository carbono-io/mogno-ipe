/**
 * Handles the creation and destruction of containers
 *
 * @author flaminio
 * @author The Carbono.io Team
 * @date 2015-09-03
 */

// External imports
//var cd    = require('carbono-docker');
//var cjm   = require('carbono-json-message');
//var proxy = require('carbono-proxy-service');

// Machine on dockerhub to be loaded if no specification is sent to json post.
var DEFAULT_CODE_MACHINE = 'simonfan/code-machine';

/**
 * Enqueues the request to create a new machine.
 * @function
 *
 * @param {Object} Requisição
 * @param {Object} Resposta
 * 
 */ 
var enqueueRequest = function (req, res) {
    
};

module.exports = function (app) {
    var machineController = {
        enqueueRequest: enqueueRequest
    };

    return machineController;
	
	// /**
	//  * Creates an container as specified in the json message
	//  */
 //    this.create = function (req, res){
 //        console.log('DEBUG calling container.create()');
	// 	res.json(
	// 		{
	// 			message: 'So far, so good.'
	// 		}
	// 	);        
 //    };

	// /**
	//  * Destroys an container as specified in the json message
	//  */
 //    this.destroy = function (req, res) {
 //        console.log('DEBUG calling container.destroy()');
	// 	res.json(
	// 		{
	// 			message: 'Doing well.'
	// 		}
	// 	)
 //    };

 //    this.list = function (req, res) {
 //        console.log('DEBUG calling container.list()');
	// 	res.json(
	// 		{
	// 			message: 'You couldn\'t be better.'
	// 		}
	// 	)
 //    };

 //    return this;
};
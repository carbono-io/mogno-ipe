/**
 * Routing for the container handlers
 *
 * @author flaminio
 * @author The Carbono.io Team
 * @date 2015-09-03
 */
'use strict';
 
 var MACHINE_PATH = '/machines';

module.exports = function (app) {
    var container = app.controllers.container;
    
    app.post(MACHINE_PATH, container.create);

    return this;
};
/**
 * Routing for the container handlers
 *
 * @author flaminio
 * @author The Carbono.io Team
 * @date 2015-09-03
 */
'use strict';
 
 var CONTAINER_PATH = '/container/';

module.exports = function (app) {

    var container = app.controllers.container;
    
    app.get(CONTAINER_PATH, container.list);
    app.post(CONTAINER_PATH, container.create);
    app.delete(CONTAINER_PATH, container.destroy);

    return this;

};
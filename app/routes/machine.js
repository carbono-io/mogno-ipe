/**
 * Routing for the container handlers
 *
 * @author flaminio
 * @author The Carbono.io Team
 * @date 2015-09-03
 */
'use strict';
 
 var MACHINE_PATH = '/paas/machines';

module.exports = function (app) {
    var machine = app.controllers.machine;
    
    app.post(MACHINE_PATH, machine.create);

    return this;
};
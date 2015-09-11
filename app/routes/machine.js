'use strict';

var MACHINE_PATH       = '/paas/machines';
var MACHINE_TOKEN_PATH = '/paas/machines/:token';

module.exports = function (app) {
    var machine = app.controllers.machine;

    app.post(MACHINE_PATH, machine.create);
    app.get(MACHINE_TOKEN_PATH, machine.getTokenStatus);

    return this;
};
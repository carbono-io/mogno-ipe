# MOGNO - Ipê module
Description
===========
This module is responsable for creating and destroying containers in the
carbono.io PaaS for the app's components. See Architecture Specs for more 
details on IPE module.

Installation and Running
============
`npm install`
`gulp serve`

Interfaces
==========

* GET container()
* POST container()
* DELETE container()

Testing
=======

* Debugging shortcuts, please keep this up to date.

```
curl -X POST http://localhost:8000/container/ -d '{"hello":"world"}' -H "Content-Type: application/json"
```

```
curl -X DELETE http://localhost:8000/container/ -d '{"hello":"world"}' -H "Content-Type: application/json"
```

```
curl -X GET http://localhost:8000/container/ -d '{"hello":"world"}' -H "Content-Type: application/json"
```

DIME frontend
=============

This is an alternative Dime_ timetracking frontend, based on AngularJS, served by NodeJS.

.. _Dime: http://dime-timetracker.de/

Installation
------------

You'll need a Dime Server (either original Dime_ or `Dime for Node.js`_) for running Dime as well, so please set that up first.

.. _`Dime for Node.js`: https://github.com/quafzi/dime-node

Clone this repo, make a copy of `config/config.json.dist` named `config/config.json` and adjust the values in there.

Usage
-----

Run the frontend server by calling

::

    node manage.js server

'use strict';

const Hapi = require('hapi');
const config = require('./config');
const server = new Hapi.Server();

server.connection({
  port: config.port
});

server.route(require('./routes'));

server.start(function(){
  console.log('Server running at:', server.info.uri);
});

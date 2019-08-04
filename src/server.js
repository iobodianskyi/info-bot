(function () {
  const http = require('http');
  const express = require('express');
  const server = express();
  const bodyParser = require('body-parser');

  const telegramBot = require('./bot');
  const config = require('../config.json');

  server.use(bodyParser.json()); // support json encoded bodies
  server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  telegramBot.start();

  // enable routes
  const apiRoutes = require('./api-routes');
  server.use(apiRoutes);

  const httpServer = http.createServer(server);

  const port = +config.port;
  httpServer.listen(port);
  console.log(`Server started on ${httpServer.address().port}`);
}());

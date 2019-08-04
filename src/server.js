(function () {
  const http = require('http');
  const express = require('express');
  const server = express();
  const bodyParser = require('body-parser');

  const telegramBot = require('./bot');

  server.use(bodyParser.json()); // support json encoded bodies
  server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  telegramBot.start();

  const httpServer = http.createServer(server);
  httpServer.listen(4333);
  console.log(`Server started on ${httpServer.address().port}`);
}());

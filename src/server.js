(function () {
  const http = require('http');
  const express = require('express');
  const server = express();
  const bodyParser = require('body-parser');
  const request = require('request');

  const telegramBot = require('./bot');
  const constants = require('./constants');

  const cors = require('cors')({origin: ['http://localhost', 'https://notes.obodianskyi.com']});

  server.use(bodyParser.json()); // support json encoded bodies
  server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
  server.use(cors);

  // enable routes
  const apiRoutes = require('./api-routes');
  server.use(apiRoutes);

  startServer = () => {
    const httpServer = http.createServer(server);
    httpServer.listen(constants.app.port);
    console.log(`Server started on ${httpServer.address().port}`);
  }

  // get app info
  request(constants.projectInfoUrl, { qs: { id: constants.projectId }, json: true }, (error, responce, body) => {

    constants.app.port = body.nodeAppPorts.infoBot;
    constants.app.telegram = body.telegram;

    telegramBot.start();

    // start server
    startServer();
  });
}());

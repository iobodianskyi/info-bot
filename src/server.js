(function () {
  const http = require('http');
  const express = require('express');
  const server = express();
  const bodyParser = require('body-parser');
  const request = require('request');

  const telegramBot = require('./bot');
  const constants = require('./constants');

  // server.use(bodyParser.json()); // support json encoded bodies
  server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

  // const cors = require('cors')({ origin: ['http://localhost:4200', 'https://notes.obodianskyi.com'] });
  // server.use(cors);

  // enable routes
  const apiRoutes = require('./api-routes');
  server.use(apiRoutes);

  startServer = (bot) => {
    server.use(bot.webhookCallback('/webhook'));
    bot.telegram.setWebhook('https://info-bot.obodianskyi.com/webhook');

    const httpServer = http.createServer(server);
    httpServer.listen(constants.app.port);
    console.log(`Server started on ${httpServer.address().port}`);
  }

  // get app info
  request(constants.projectInfoUrl, { qs: { id: constants.projectId }, json: true }, (error, responce, body) => {

    constants.app.port = body.port;
    constants.app.telegram = body.telegram;

    const bot = telegramBot.start();

    // start server
    startServer(bot);
  });
}());

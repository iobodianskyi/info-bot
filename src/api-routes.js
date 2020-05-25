(function () {
  const server = require('express')();
  const bodyParser = require('body-parser');
  const telegramBot = require('./bot');

  // POST /send-message
  server.post('/send-message', bodyParser.json(), (req, res) => {
    if (req.body.message) {
      telegramBot.sendMessage(req.body.message, req.body.options);
    }

    return res.send({ success: true });
  });

  module.exports = server;
}());

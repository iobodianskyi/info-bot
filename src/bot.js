(function () {
  const Telegraf = require('telegraf');
  const Telegram = require('telegraf/telegram');

  const constants = require('./constants');

  let telegram;
  let telegramBot;

  start = () => {
    telegram = new Telegram(constants.app.telegram.infoBotToken);
    telegramBot = new Telegraf(constants.app.telegram.infoBotToken);

    const commands = {
      ping: 'ping'
    };

    // for BotFather commands setup
    // ping - Is online...

    const messages = {
      started: 'Bot started 🚀',
      welcome: '🤗 Welcome to info bot!',
      ping: '🏓 pong',
      error: 'Ooops! an error occured: '
    };

    telegramBot.catch((err) => {
      console.log(messages.error, err)
    });

    telegramBot.start((ctx) => {
      return ctx.reply(messages.welcome);
    });

    // commands
    telegramBot.command(commands.ping, ({ reply }) => reply(messages.ping));

    // telegramBot.startPolling();

    sendMessage(messages.started);

    return telegramBot;
  }

  sendMessage = (message, options) => {
    telegram.sendMessage(constants.app.telegram.myTelegramUserId, message, options);
  }

  const bot = {
    start: start,
    sendMessage
  };

  module.exports = bot;
})();

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
      welcome: '🤗 Welcome to info bot !',
      ping: '🏓 pong'
    };

    telegramBot.catch((err) => {
      console.log('Ooops! an error occured: ', err)
    })

    telegramBot.start((ctx) => {
      return ctx.reply(messages.welcome);
    });

    // commands
    telegramBot.command(commands.ping, ({ reply }) => reply(messages.ping));

    telegramBot.startPolling();
  }

  sendMessage = (message, options) => {
    telegram.sendMessage(constants.telegram.myTelegramUserId, message, options);
  }

  const bot = {
    start: start,
    sendMessage
  };

  module.exports = bot;
})();

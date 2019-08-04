(function () {
  const Telegraf = require('telegraf');
  const Telegram = require('telegraf/telegram');

  const config = require('../config.json');

  let telegram;
  let telegramBot;

  start = () => {
    telegram = new Telegram(config.token);
    telegramBot = new Telegraf(config.token);

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
    telegram.sendMessage(config.myTelegramUserId, message, options);
  }

  const bot = {
    start: start,
    sendMessage
  };

  module.exports = bot;
})();

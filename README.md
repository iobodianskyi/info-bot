# Info Bot

Telegram bot for sending notifications

## Installation

Install all required packages with `npm install`

## Get started

Project uses nodejs [Node js](https://nodejs.org) with [Espress](https://expressjs.com) as server and [Telegraf](https://telegraf.js.org) as bot API

Run `npm run start` to run server

## Deployment

Project hosted on DigitalOcean ubuntu OS. Configured on nginx and started with pm2.
To update after push on master branch need to execute following:

`cd /root/bots/info-bot/ && git pull && npm i && pm2 restart info-bot`

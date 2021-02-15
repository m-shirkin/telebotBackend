# Telebot Backend

This project is a web-server for running Telegram bot files. It also maintains a local database with messages that the bot received. It was developed on Node.js using [NestJS](https://nestjs.com/) framework.

To view the API go to `https://*server-address*:3000/api`

## Configuration files

`src/telebot/token.ts/` - Telegram bot API token (for `@test_4132947132_bot` by default).

`config.ts` - All other options.

## Running

`npm run start` or `nest start` - running server.

`npm run test` or `jest` - running unit tests.

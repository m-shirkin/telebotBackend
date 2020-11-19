const Telegraf = require('telegraf');

const bot = new Telegraf('1042816065:AAGuR4ZgIliKjtLeyQiceGviYRcL4y1areU');
bot.on('message', (ctx)=>{ctx.reply('123'); console.log(ctx.update.message)});
bot.launch();
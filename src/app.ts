import { Telegraf } from 'telegraf'
import { InlineQueryResult } from 'typegram'
require('dotenv').config()

import { ShoppingBook } from './ShoppingBook'

const bot = new Telegraf(process.env.BOT_TOKEN as string)


const shoppingBook = new ShoppingBook()

bot.command('quit', (ctx) => {
  // Using context shortcut
  ctx.leaveChat()
})

bot.on('text', (ctx) => {
  let result:string = ""
  let message = ctx.message.text
  if (message.toUpperCase().startsWith("СПИСОК ПОКУПОК")){
    result = shoppingBook.getItems(ctx.chat.id)
  } else if (message.startsWith('-')) {
    shoppingBook.removeItem(ctx.chat.id, message.slice(1))
  } else {
    shoppingBook.addToList(ctx.chat.id, message)
  }

  if (result !== "") {
    ctx.reply(result)
  }

  console.log(ctx.update.message)
})

bot.on('callback_query', (ctx) => {
  // Using context shortcut
  ctx.answerCbQuery()
})

bot.on('inline_query', (ctx) => {
  const result:InlineQueryResult[] = [];
  // Using context shortcut
  ctx.answerInlineQuery(result)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

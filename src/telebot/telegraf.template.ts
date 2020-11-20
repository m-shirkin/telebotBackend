import {Observable, Subject} from "rxjs";
import Telegraf from 'telegraf';
import {Message} from "telegraf/typings/telegram-types";
import {TelegrafContext} from "telegraf/typings/context";
import {Injectable} from "@nestjs/common";

//Service returns observable, which all incoming messages go through
@Injectable()
export class TelegrafTemplate {
    loop(bot: Telegraf<TelegrafContext>, code: string): Observable<Message> {
        let messageSubject = new Subject<Message>();

        bot.use(async (ctx, next) => {
            messageSubject.next(ctx.update.message);
            await next();
        })

        eval(code);

        bot.launch().catch((error) => console.error(error));

        return messageSubject;
    }
}

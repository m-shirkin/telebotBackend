import {Observable, Subject} from "rxjs";
import {Telegraf} from 'telegraf';
import {Message} from "telegraf/typings/telegram-types";
import {TelegrafContext} from "telegraf/typings/context";
import {Injectable} from "@nestjs/common";
import * as ts from 'typescript';

//Service returns observable with all incoming messages
@Injectable()
export class TelegrafTemplate {
    loop(bot: Telegraf<TelegrafContext>, code: string): Observable<Message> {
        let messageSubject = new Subject<Message>();

        bot.use(async (ctx, next) => {
            messageSubject.next(ctx.update.message);
            await next();
        })

        let jsCode = ts.transpile(code);
        eval(jsCode);

        bot.launch().catch((error) => console.error(error));

        return messageSubject;
    }
}

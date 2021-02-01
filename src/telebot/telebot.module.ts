import {HttpModule, Module} from "@nestjs/common";
import {TelebotRepository} from "./telebot.repository.service";
import {TelebotFileController} from "./telebot.file.controller";
import {TelebotController} from "./telebot.controller";
import {TelegrafTemplate} from "./telegraf.template";
import token from "./token";

//This module manages and runs bot script files
@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        TelebotRepository,
        TelegrafTemplate,
        {
            provide: 'TELEGRAM_TOKEN',
            useValue: token,
        }
    ],
    controllers: [
        TelebotController,
        TelebotFileController,
    ]
})
export class TelebotModule {}

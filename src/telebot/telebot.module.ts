import {HttpModule, Module} from "@nestjs/common";
import {TelebotRepository} from "./telebot.repository.service";
import {TelebotFileController} from "./telebot.file.controller";
import {TelebotController} from "./telebot.controller";
import {TelegrafTemplate} from "./telegraf.template";

//This module manages and runs bot script files
@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        TelebotRepository,
        TelegrafTemplate,
    ],
    controllers: [
        TelebotController,
        TelebotFileController,
    ]
})
export class TelebotModule {}
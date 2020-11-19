import {HttpModule, Module} from "@nestjs/common";
import {TelebotRepository} from "./telebot.repository.service";
import {TelebotFileController} from "./telebot.file.controller";
import {TelebotService} from "./telebot.service";
import {TelebotController} from "./telebot.controller";

@Module({
    imports: [HttpModule],
    providers: [
        TelebotRepository, TelebotService,
    ],
    controllers: [
        TelebotController, TelebotFileController
    ]
})
export class TelebotModule {}
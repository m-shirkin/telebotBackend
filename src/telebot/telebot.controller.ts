import {Body, Controller, Post} from "@nestjs/common";
import {Telegraf} from "telegraf";
import {TelegrafContext} from "telegraf/typings/context";
import {Message} from "telegraf/typings/telegram-types"
import token from './token'
import {TelebotRepository} from "./telebot.repository.service";
import {TelebotOptions} from "../../config";
import {TelegrafTemplate} from "./telegraf.template";
import * as fs from 'fs';
import {ApiConsumes, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Bot execution')
@Controller('telebot')
export class TelebotController {
    constructor(
        private telebotRepository: TelebotRepository,
        private telebotOptions: TelebotOptions,
        private telegrafTemplate: TelegrafTemplate,
    ) {
        this.resetBot();
    }

    private telegrafBot: Telegraf<TelegrafContext>;

    private async runCode(scriptCode: string): Promise<void> {
        if (this.telegrafBot) {
            await this.telegrafBot.stop();
        }
        this.telegrafBot = new Telegraf<TelegrafContext>(token);
        let messageObservable = this.telegrafTemplate.loop(this.telegrafBot, scriptCode);
        messageObservable.subscribe((msg: Message) => this.telebotRepository.sendData(msg));
    }

    @ApiConsumes('text/plain')
    @ApiOperation({
        description: 'Send a script on execution',
    })
    @Post('run')
    async dispatchScript(
        @Body() filename: string,
    ): Promise<void> {
        let scriptCode = (await fs.promises.readFile(
            `${this.telebotOptions.scriptFolder}/${filename}`
        )).toString();
        await this.runCode(scriptCode);
    }

    @ApiOperation({
        description: 'Reset telegraf bot',
    })
    @Post('reset')
    async resetBot(): Promise<void> {
        await this.runCode('');
    }
}
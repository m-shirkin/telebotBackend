import {Body, Controller, Get, HttpException, HttpStatus, Inject, Post} from "@nestjs/common";
import {Telegraf} from "telegraf";
import {TelegrafContext} from "telegraf/typings/context";
import {Message} from "telegraf/typings/telegram-types"
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
        @Inject('TELEGRAM_TOKEN') private token: string,
    ) {
        this.resetBot().catch((reason: any) => {
            throw new Error(reason);
        });
    }

    private telegrafBot: Telegraf<TelegrafContext>;
    private currentlyRunning: string = '';
    private telegrafBusy = false;

    private async runCode(scriptCode: string): Promise<void> {
        this.telegrafBusy = true;
        await (async () => {
            if (this.telegrafBot) {
                await this.telegrafBot.stop();
            }
            this.telegrafBot = new Telegraf<TelegrafContext>(this.token);
            let messageObservable = this.telegrafTemplate.loop(this.telegrafBot, scriptCode);
            messageObservable.subscribe((msg: Message) => this.telebotRepository.sendData(msg));
        })().finally(() => {
            this.telegrafBusy = false;
        });
    }

    @ApiConsumes('text/plain')
    @ApiOperation({
        description: 'Send a script on execution',
    })
    @Post('run')
    async dispatchScript(
        @Body() filename: string,
    ): Promise<void> {
        this.currentlyRunning = filename;
        let scriptCode = (await fs.promises.readFile(
            `${this.telebotOptions.scriptFolder}/${filename}`
        )).toString();
        if (this.telegrafBusy) {
            throw new HttpException(
                {
                    'message': "Another script already being dispatched",
                    'statusCode': 503,
                    'Retry-After': 30,
                },
                HttpStatus.SERVICE_UNAVAILABLE,
            );
        } else {
            await this.runCode(scriptCode);
        }
    }

    @ApiOperation({
        description: 'Reset telegraf bot',
    })
    @Post('reset')
    async resetBot(): Promise<void> {
        await this.runCode('');
    }

    @ApiOperation({
        description: 'Get running script filename',
    })
    @Get('run')
    async getCurrentlyRunning(): Promise<string> {
        return this.currentlyRunning;
    }
}

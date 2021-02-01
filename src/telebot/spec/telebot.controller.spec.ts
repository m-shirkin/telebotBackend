// TODO: write tests for TelebotController

import {TelebotController} from "../telebot.controller";
import {from, Observable} from "rxjs";
import {Test} from "@nestjs/testing";
import {TelebotOptions} from "../../../config";
import {TelebotRepository} from "../telebot.repository.service";
import {TelegrafTemplate} from "../telegraf.template";

describe('TelebotController', () => {
    let telebotController: TelebotController;

    let buffer: Array<any>;

    const messages = [1,2,3,4];

    beforeEach(async () => {
        const testDir = './tempTest';

        buffer = [];

        class MockTelebotOptions {
            readonly scriptFolder = testDir;
        }

        class MockTelebotRepository {
            sendData(...args: Array<any>): void {
                buffer.push(args[0]);
            }
        }

        let wrongToken = 'not_a_token';

        class MockTelegrafTemplate {
            loop(...args: Array<any>): Observable<any> {
                return from(messages);
            }
        }

        const testModule = await Test.createTestingModule({
            controllers: [TelebotController],
            providers: [
                {
                    provide: TelebotOptions,
                    useClass: MockTelebotOptions,
                },
                {
                    provide: TelebotRepository,
                    useClass: MockTelebotRepository,
                },
                {
                    provide: 'TELEGRAM_TOKEN',
                    useValue: wrongToken,
                },
                {
                    provide: TelegrafTemplate,
                    useClass: MockTelegrafTemplate,
                }
            ]
        }).compile();

        telebotController = testModule.get(TelebotController);

        // Wait 2 seconds so its ready
        await new Promise<void>(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        resolve();
                    },
                    2000,
                );
            }
        );
    })

    // Test that controller creates and sends messages to repository
    it('Creation test', async () => {
        expect(buffer).toEqual(messages);
    });
});

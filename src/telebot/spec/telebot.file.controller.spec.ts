import {TelebotFileController} from "../telebot.file.controller";
import {TelebotOptions} from "../../../config";
import {Test} from "@nestjs/testing";
import * as fs from 'fs';

describe('TelebotFileController', () => {
    const testDir = './tempTest'

    class MockTelebotOptions {
        readonly scriptFolder = testDir;
    }

    let telebotFileController: TelebotFileController;

    beforeEach(async () => {
        const testModule = await Test.createTestingModule({
            controllers: [TelebotFileController],
            providers: [
                {
                    provide: TelebotOptions,
                    useClass: MockTelebotOptions,
                }
            ]
        }).compile();

        telebotFileController = testModule.get(TelebotFileController);

        await fs.promises.mkdir(testDir);
    });

    afterEach(async () => {
        await fs.promises.rmdir(testDir, { recursive: true });
    });

    describe('getFileList', () => {
        it('some files', async () => {
            let testFiles = ['test1', 'test2', 'test3'];
            testFiles.forEach((val) => fs.writeFileSync(`${testDir}/${val}`, ''));
            expect(await telebotFileController.getFileList()).toEqual(testFiles);
        });

        it('empty list', async () => {
            expect(await telebotFileController.getFileList()).toEqual([]);
        });
    });

    describe('getFileText', () => {
        it('non-existent file', async () => {
            expect(await telebotFileController.getFileText('idontexist.txt')).toEqual('');
        });

        it('some file', async () => {
            let text = 'Test 123';
            let filename = 'test.txt';
            await fs.promises.writeFile(`${testDir}/${filename}`, text);
            expect(await telebotFileController.getFileText(filename)).toEqual(text);
        });
    });

    describe('writeFileText', () => {
        it('new file', async () => {
            let text = 'Test 123';
            let filename = 'test.txt';
            await telebotFileController.writeFileText(filename, text);
            expect((await fs.promises.readFile(`${testDir}/${filename}`)).toString()).toEqual(text);
        });

        it('modify file', async () => {
            let text = 'Test 123';
            let filename = 'test.txt';
            await fs.promises.writeFile(`${testDir}/${filename}`, text);
            let new_text = 'Test 456';
            await telebotFileController.writeFileText(filename, new_text);
            expect((await fs.promises.readFile(`${testDir}/${filename}`)).toString()).toEqual(new_text);
        });
    });

    describe('deleteFile', () => {
        it('some file', async () => {
            let filename = 'test.txt';
            let filenameDeleted = 'testdel.txt';
            await fs.promises.writeFile(`${testDir}/${filename}`, '');
            await fs.promises.writeFile(`${testDir}/${filenameDeleted}`, '');
            await telebotFileController.deleteFile(filenameDeleted);
            expect(await fs.promises.readdir(testDir)).toEqual([filename]);
        });
    });
})
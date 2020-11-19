import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {TelebotOptions} from "../../config";
import * as fs from 'fs';

@ApiTags('Bot files')
@Controller('telebot')
export class TelebotFileController {
    constructor(private telebotOptions: TelebotOptions) {}

    //Get list of all bot script files
    @Get('files')
    async getFileList(): Promise<Array<string>> {
        return fs.promises.readdir(this.telebotOptions.scriptFolder);
    }

    //Get text of a specific file
    @Get('files:filename')
    async getFileText(
        @Param('filename') filename: string
    ): Promise<string> {
        return (await fs.promises.readFile(
            `${this.telebotOptions.scriptFolder}/${filename}`
        ).catch(_=>{ return '' })).toString() || '';
    }

    //Write to a specific file
    @Post('files:filename')
    async writeFileText(
        @Param('filename') filename: string,
        @Body() contents: string,
    ): Promise<void> {
        return fs.promises.writeFile(
            `${this.telebotOptions.scriptFolder}/${filename}`,
            contents,
        );
    }

    //Delete specific file
    @Delete('files:filename')
    async deleteFile(
        @Param('filename') filename: string,
    ): Promise<void> {
        return fs.promises.rmdir(
            `${this.telebotOptions.scriptFolder}/${filename}`,
            {
                recursive: true
            }
        );
    }
}
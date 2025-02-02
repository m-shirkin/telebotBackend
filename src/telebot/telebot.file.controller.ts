    import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post} from "@nestjs/common";
import {ApiConsumes, ApiOperation, ApiTags} from "@nestjs/swagger";
import {TelebotOptions} from "../../config";
import * as fs from 'fs';

@ApiTags('Bot files')
@Controller('telebot')
export class TelebotFileController {
    constructor(private telebotOptions: TelebotOptions) {
        fs.mkdir(this.telebotOptions.scriptFolder, _=>{});
    }

    @ApiOperation({
        description: 'Get list of all bot script files'
    })
    @Get('files')
    async getFileList(): Promise<Array<string>> {
        return fs.promises.readdir(this.telebotOptions.scriptFolder);
    }

    @ApiOperation({
        description: 'Get text of a specific file'
    })
    @Get('files/:filename')
    async getFileText(
        @Param('filename') filename: string
    ): Promise<string> {
        return (await fs.promises.readFile(
            `${this.telebotOptions.scriptFolder}/${filename}`
        ).catch(_=>{ return '' })).toString() || '';
    }

    @ApiConsumes('text/plain')
    @ApiOperation({
        description: 'Write to a specific file',
    })
    @Post('files/:filename')
    async writeFileText(
        @Param('filename') filename: string,
        @Body() contents: string,
    ): Promise<void> {
        return fs.promises.writeFile(
            `${this.telebotOptions.scriptFolder}/${filename}`,
            contents,
        );
    }

    @ApiOperation({
        description: 'Delete a specific file'
    })
    @Delete('files/:filename')
    async deleteFile(
        @Param('filename') filename: string,
    ): Promise<void> {
        return fs.promises.unlink(
            `${this.telebotOptions.scriptFolder}/${filename}`,
        ).catch(
            (error) => {
                if (error.code === 'ENOENT') {
                    throw new HttpException(
                        `File "${filename}" does not exist`,
                        HttpStatus.BAD_REQUEST,
                    )
                } else {
                    throw error;
                }
            }
        );
    }
}

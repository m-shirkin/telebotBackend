import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, ParseIntPipe, Post, Query} from "@nestjs/common";
import {MessageEntity} from "../../entity/message.entity";

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
    ) {}

    @ApiOperation({
        description: 'Get total number of messages in the database',
    })
    @Get('size')
    async getSize(): Promise<number> {
        return this.messageRepository.count();
    }

    @ApiOperation({
        description: 'Get a single message',
    })
    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe) id: number
    ): Promise<MessageEntity> {
        return (await this.messageRepository
            .find({
                skip: id,
                take: 1
            }))[0];
    }

    @ApiOperation({
        description: 'Get *size* messages, skipping first *offset*',
    })
    @Get()
    async getMany(
        @Query('offset', ParseIntPipe) offset: number,
        @Query('size', ParseIntPipe) size: number,
        @Query('sort') sort: string,
    ): Promise<MessageEntity[]> {
        if (sort) {
            let sort_params = sort.split(',');
            let order: {
                [field in keyof MessageEntity]?: "ASC" | "DESC" | 1 | -1;
            } = {};
            for (let sort_field of sort_params) {
                let sort_instance = sort_field.split(':');
                order[sort_instance[0]] = sort_instance[1].toUpperCase() || 'ASC';
            }
            return this.messageRepository
                .find({
                    skip: offset,
                    take: size,
                    order: order,
                });
        } else {
            return this.messageRepository
                .find({
                    skip: offset,
                    take: size,
                });
        }
    }

    @ApiOperation({
        description: 'Get message by its message_id',
    })
    @Get()
    async getByMid(
        @Query('mid') mid: string,
    ): Promise<MessageEntity> {
        return this.messageRepository
            .findOne({
                where: {
                    message_id: mid
                }
            });
    }

    @ApiOperation({
        description: 'Add one message to the database',
    })
    @Post()
    async addOne(
        @Body() newMessage: MessageEntity
    ): Promise<void> {
        await this.messageRepository
            .save(newMessage);
    }
}

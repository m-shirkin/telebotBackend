import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, ParseIntPipe, Post, Query} from "@nestjs/common";
import {MessageEntity} from "../../entity/message.entity";

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>
    ) {}

    //Get a single message
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<MessageEntity> {
        return (await this.messageRepository
            .find({
                skip: id,
                take: 1
            }))[0];
    }

    //Get 'size' messages, skipping first 'offset'
    @Get()
    async getMany(
        @Query('offset', ParseIntPipe) offset: number,
        @Query('size', ParseIntPipe) size: number,
    ): Promise<MessageEntity[]> {
        return this.messageRepository
            .find({
                skip: offset,
                take: size
            });
    }

    //Get message by its message_id
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

    //Add one message to the database
    @Post()
    async addOne(
        @Body() newMessage: MessageEntity
    ): Promise<void> {
        await this.messageRepository
            .save(newMessage);
    }
}

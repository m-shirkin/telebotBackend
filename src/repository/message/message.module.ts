import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {MessageController} from "./message.controller";
import {MessageEntity} from "../../entity/message.entity";

@Module({
    imports: [TypeOrmModule.forFeature([MessageEntity])],
    controllers: [MessageController],
})
export class MessageModule {}

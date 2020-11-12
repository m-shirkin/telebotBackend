import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class MessageEntity {
    //Entity, that maps to a TypeORM database table
    //This one represents messages, as defined in Telegram API
    //https://core.telegram.org/bots/api#message

    @PrimaryColumn()
    message_id: string;
    //Message id

    @PrimaryColumn()
    from_user_id: string;
    //Id of the user, who sent the message

    @Column()
    date: string;
    //Date when message was sent as UNIX time

    @Column("varchar", {length: 4096})
    text: string;
    //Text of the message

    @Column("varchar", {length: 32768})
    raw_json: string;
    //Raw json response as sent by the telegram server
}
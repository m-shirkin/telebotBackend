import {Column, Entity, PrimaryColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class UserEntity {
    //Entity, that maps to a TypeORM database table
    //This one represents users, as defined in Telegram API
    //https://core.telegram.org/bots/api#user

    @ApiProperty()
    @PrimaryColumn()
    user_id: string;
    //User id

    @ApiProperty()
    @Column()
    first_name: string;
    //First name

    @ApiProperty()
    @Column()
    last_name: string;
    //Last name

    @ApiProperty()
    @Column()
    username: string;
    //Username e.g. @user123

    @ApiProperty()
    @Column()
    language_code: string;
    //IETF language tag of the user's language
}
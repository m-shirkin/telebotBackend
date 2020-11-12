import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class UserEntity {
    //Entity, that maps to a TypeORM database table
    //This one represents users, as defined in Telegram API
    //https://core.telegram.org/bots/api#user

    @PrimaryColumn()
    user_id: string;
    //User id

    @Column()
    first_name: string;
    //First name

    @Column()
    last_name: string;
    //Last name

    @Column()
    username: string;
    //Username e.g. @user123

    @Column()
    language_code: string;
    //IETF language tag of the user's language
}
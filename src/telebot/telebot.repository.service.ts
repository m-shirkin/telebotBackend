import {HttpService, Injectable} from "@nestjs/common";
import {MessageEntity} from "../entity/message.entity";
import {UserEntity} from "../entity/user.entity";
import {ApiUrlOptions} from "../../config";
import {zip} from "rxjs";

interface MessageData {
    msg: MessageEntity,
    usr: UserEntity,
}

@Injectable()
export class TelebotRepository {
    constructor(
        private apiUrlOptions: ApiUrlOptions,
        private httpService: HttpService,
    ) {}

    convertToEntities(message: any): MessageData {
        let msg: MessageEntity = {
            message_id: message.message_id || '',
            from_user_id: message.from.id || '',
            date: message.date || '',
            text: message.text || '',
            raw_json: JSON.stringify(message) || '{}',
        };
        let usr: UserEntity = {
            user_id: message.from.id || '',
            first_name: message.from.first_name || '',
            last_name: message.from.last_name || '',
            username: message.from.username || '',
            language_code: message.from.language_code || '',
        };
        return {
            msg: msg,
            usr: usr,
        }
    }

    async sendData(message: any): Promise<void> {
        let data: MessageData = this.convertToEntities(message);
        let usrPost = this.httpService.post(
            this.apiUrlOptions.apiUrl + '/users',
            data.usr
        );
        let msgPost = this.httpService.post(
            this.apiUrlOptions.apiUrl + '/messages',
            data.msg
        );
        await zip(usrPost, msgPost).toPromise();
    }
}

import {Injectable} from "@nestjs/common";

@Injectable()
export class TypeORMOptions {
    readonly type = 'sqlite';
    readonly database = './database.db';
    readonly autoLoadEntities = true;
    readonly synchronize = true;
}

@Injectable()
export class ApiUrlOptions {
    readonly url = '127.0.0.1'
    readonly prefix = 'api';
    readonly port = 3000;
    readonly apiUrl = `http://${this.url}:${this.port}/${this.prefix}`;
}

@Injectable()
export class SwaggerOptions {
    readonly title = 'Message database API';
    readonly description = 'API for storing and retrieving telegram users and messages';
    readonly version = '1.0';
}

@Injectable()
export class TelebotOptions {
    readonly scriptFolder = 'scripts'
}
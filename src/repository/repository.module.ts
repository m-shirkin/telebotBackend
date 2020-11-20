import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {MessageModule} from "./message/message.module";
import {TypeORMOptions} from "../../config";

//TODO: fix Swagger not showing all methods
//This module stores message data in the database and retrieves message data from it
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [TypeORMOptions],
            useFactory: (typeORMOptions: TypeORMOptions) =>
                (typeORMOptions as TypeOrmModuleOptions),
        }),
        UserModule,
        MessageModule,
    ],
})
export class RepositoryModule {}

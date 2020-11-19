import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {MessageModule} from "./message/message.module";
import {TypeORMOptions} from "../../config";

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

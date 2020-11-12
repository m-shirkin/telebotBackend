import {Module} from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entity/user.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: './test.db',
            entities: [UserEntity],
            synchronize: true
        }),
        UserModule,
    ],
})
export class AppModule {}

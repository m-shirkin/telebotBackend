import {Global, Module} from "@nestjs/common";
import {RepositoryModule} from "./repository/repository.module";
import {SwaggerOptions, TypeORMOptions, ApiUrlOptions, TelebotOptions} from "../config";
import {TelebotModule} from "./telebot/telebot.module";

@Global()
@Module({
    imports: [
        RepositoryModule,
        TelebotModule,
    ],
    providers: [
        TypeORMOptions,
        ApiUrlOptions,
        SwaggerOptions,
        TelebotOptions,
    ],
    exports: [
        TypeORMOptions,
        ApiUrlOptions,
        SwaggerOptions,
        TelebotOptions,
    ],
})
export class AppModule {}

import {Global, Module} from "@nestjs/common";
import {RepositoryModule} from "./repository/repository.module";
import {SwaggerOptions, TypeORMOptions, ApiUrlOptions, TelebotOptions} from "../config";

@Global()
@Module({
    imports: [
        RepositoryModule,
    ],
    providers: [
        TypeORMOptions, ApiUrlOptions, SwaggerOptions, TelebotOptions
    ],
    exports: [
        TypeORMOptions, ApiUrlOptions, SwaggerOptions, TelebotOptions
    ],
})
export class AppModule {}

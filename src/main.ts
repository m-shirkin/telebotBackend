import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from "./app.module";
import {SwaggerOptions, ApiUrlOptions} from "../config";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    let apiUrlOptions = app.get(ApiUrlOptions);
    let swaggerOptions = app.get(SwaggerOptions);

    app.setGlobalPrefix(apiUrlOptions.prefix);

    //Swagger OpenAPI setup
    const options = new DocumentBuilder()
        .setTitle(swaggerOptions.title)
        .setDescription(swaggerOptions.description)
        .setVersion(swaggerOptions.version)
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(apiUrlOptions.prefix, app, document);

    await app.listen(apiUrlOptions.port);
}
bootstrap();
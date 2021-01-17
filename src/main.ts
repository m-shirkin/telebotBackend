import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from "./app.module";
import {SwaggerOptions, ApiUrlOptions} from "../config";
import {text as bodyParserText} from "body-parser";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    //Enable CORS to any address
    app.enableCors({
        origin: "*",
    });

    const apiUrlOptions = app.get(ApiUrlOptions);
    app.setGlobalPrefix(apiUrlOptions.prefix);

    //Use parser for text/plain requests
    app.use(bodyParserText());

    //Swagger OpenAPI setup
    const swaggerOptions = app.get(SwaggerOptions);

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

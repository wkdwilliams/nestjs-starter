import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { Logger } from './components/Loggers/Logger';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: new Logger()
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.enableCors();

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const document = SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
            .setTitle('Booking')
            .setDescription('A booking system')
            .setVersion('1.0')
            .addBearerAuth()
            .build(),
    );

    SwaggerModule.setup(
        'api',
        app,
        document,
    );

    app.use(helmet({
        xXssProtection: true
    }));

    await app.listen(process.env.PORT);
}

bootstrap();

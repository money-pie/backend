import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("MoneyPie API")
    .setDescription("MoneyPie app REST API documentation")
    .setVersion("0.1")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para el frontend (localhost:4200)
  app.enableCors({
    origin: 'http://localhost:4200',  // Dirección de tu frontend
    methods: 'GET, POST, PUT, DELETE',  // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization',  // Cabeceras permitidas
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

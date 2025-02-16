import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EstadisticasModule } from './Estadisticas/estadisticas.module';
import { Estadisticas } from './entities/estadisticas.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Cargar variables de entorno

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,        
      port: Number(process.env.DB_PORT),               
      username: process.env.DB_USER, 
      password: process.env.DB_PASSWORD,  
      database: process.env.DB_NAME, 
      autoLoadEntities: true,    
      synchronize: true,   
      ssl: {
        rejectUnauthorized: false,  // Acepta certificados sin validar
      },
    }),    

    EstadisticasModule, // Se usa directamente en imports
  ],
})
export class AppModule {}
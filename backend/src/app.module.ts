import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estadisticas } from './entities/estadisticas.entity';
import { EstadisticasService } from './Estadisticas/estadisticas.service'; 
import { EstadisticasController } from './Estadisticas/estadisticas.controller'; 
import { EstadisticasModule } from './Estadisticas/estadisticas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',        
      port: 5432,               
      username: 'transporte_usuario', 
      password: 'Popobebe123/',  
      database: 'rt_transporte', 
      autoLoadEntities: true,    
      synchronize: true,        
    }),
    TypeOrmModule.forFeature([Estadisticas]),
    
  ],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
@Module({
  imports: [EstadisticasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

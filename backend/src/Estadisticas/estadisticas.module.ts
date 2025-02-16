import { Module } from '@nestjs/common';
import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasService } from './estadisticas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estadisticas } from '../entities/estadisticas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estadisticas])],
  controllers: [EstadisticasController],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}

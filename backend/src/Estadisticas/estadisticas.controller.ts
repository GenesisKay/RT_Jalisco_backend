import { Controller, Get, Query } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  // Ruta para obtener todas las estadísticas (sin filtros)
  @Get('all')
  async getAllEstadisticas() {
    const estadisticas = await this.estadisticasService.obtenerEstadisticas();
    return estadisticas;
  }

  // Ruta para obtener las estadísticas con filtros
  @Get()
  async getFilteredEstadisticas(
    @Query('yearStart') yearStart: number,
    @Query('monthStart') monthStart: number,
    @Query('yearEnd') yearEnd: number,
    @Query('monthEnd') monthEnd: number,
    @Query('transporte') transporte: string,
  ) {
    const estadisticas = await this.estadisticasService.obtenerEstadisticasConFiltros(
      yearStart,
      monthStart,
      yearEnd,
      monthEnd,
      transporte
    );
    return estadisticas;
  }

  // Ruta para extraer los datos desde la API
  @Get('fetch')
  async fetchData() {
    await this.estadisticasService.fetchDataFromApi();
    return { message: 'Datos extraídos y almacenados correctamente.' };
  }
}
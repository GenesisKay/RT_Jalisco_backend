import { Injectable } from '@nestjs/common';
import { Estadisticas } from '../entities/estadisticas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Estadisticas)
    private readonly estadisticasRepository: Repository<Estadisticas>,
  ) {}

  // Método para obtener todas las estadísticas (sin filtros)
  async obtenerEstadisticas(): Promise<Estadisticas[]> {
    const estadisticas = await this.estadisticasRepository.find();

    return estadisticas.map(est => ({
      ...est,
      ingresosPasaje: Number(est.ingresosPasaje), 
      kilometrosRecorridos: Number(est.kilometrosRecorridos), 
      longitudServicio: Number(est.longitudServicio)
    }));
  }

  // Método para obtener estadísticas con filtros
  async obtenerEstadisticasConFiltros(
    yearStart: number,
    monthStart: number,
    yearEnd: number,
    monthEnd: number,
    transporte: string,
  ): Promise<Estadisticas[]> {
    const queryBuilder = this.estadisticasRepository.createQueryBuilder('estadistica');

    // Filtro por transporte (si no es 'all')
    if (transporte !== 'all') {
      queryBuilder.andWhere('estadistica.transporte = :transporte', { transporte });
    }

    // Filtro por año
    if (yearStart && yearEnd) {
      queryBuilder.andWhere('estadistica.año BETWEEN :yearStart AND :yearEnd', { yearStart, yearEnd });
    }

    // Filtro por mes
    if (monthStart && monthEnd) {
      queryBuilder.andWhere('estadistica.mes BETWEEN :monthStart AND :monthEnd', { monthStart, monthEnd });
    }

    const estadisticas = await queryBuilder.getMany();

    // Convertir los valores de decimal a number antes de devolverlos
    return estadisticas.map(est => ({
      ...est,
      ingresosPasaje: Number(est.ingresosPasaje), 
      kilometrosRecorridos: Number(est.kilometrosRecorridos), 
      longitudServicio: Number(est.longitudServicio)
    }));
  }

  // Método para obtener datos de la API externa y almacenarlos
  async fetchDataFromApi(): Promise<void> {
    try {
      const apiUrl = 'http://apiiieg.jalisco.gob.mx/api/etup';
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        const data = response.data;
        const parsedData = this.parseData(data);
        await this.saveData(parsedData);
      } else {
        console.log('Error al realizar la solicitud. Código de respuesta:', response.status);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }

  private parseData(rawData: any): Estadisticas[] {
    const data = rawData.data || rawData;
    return data.map(item => ({
      año: Number(item.Anio) || 0,
      mes: Number(item.ID_mes) || 0,
      transporte: item.Transporte || '',
      ingresosPasaje: item.Variable === 'Ingresos por pasaje' ? Number(item.Valor) : 0,
      kilometrosRecorridos: item.Variable === 'Kilómetros recorridos' ? Number(item.Valor) : 0,
      longitudServicio: item.Variable === 'Longitud de servicio' ? Number(item.Valor) : 0,
      pasajerosTransportados: item.Variable === 'Pasajeros transportados' ? Number(item.Valor) : 0,
      unidadesOperacion: item.Variable === 'Unidades en operación' ? Number(item.Valor) : 0,
    }));
  }

  private async saveData(data: Estadisticas[]): Promise<void> {
    for (const item of data) {
      const estadistica = this.estadisticasRepository.create(item);
      await this.estadisticasRepository.save(estadistica);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estadisticas } from './entities/estadisticas.entity';

@Injectable()
export class TransportesService {
  constructor(
    @InjectRepository(Estadisticas)
    private readonly estaticaRepository: Repository<Estadisticas>,
  ) {}

  async getTransportes() {
    return await this.estaticaRepository.find();
  }
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Estadisticas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  año: number;

  @Column()
  mes: number;

  @Column()
  transporte: string;

  @Column('decimal')
  ingresosPasaje: number;

  @Column('decimal')
  kilometrosRecorridos: number;

  @Column('decimal')
  longitudServicio: number;

  @Column('int')
  pasajerosTransportados: number;

  @Column('int')
  unidadesOperacion: number;
}

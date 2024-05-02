import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
@Entity()
export class Transaccion {
  @PrimaryGeneratedColumn()
  id_transaccion: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column()
  coste: number;

  @Column()
  fecha_compra: Date;
}

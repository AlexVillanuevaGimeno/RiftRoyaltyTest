import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Permiso {
  @PrimaryGeneratedColumn()
  id_permiso: number;

  @Column()
  nombre: string;
}

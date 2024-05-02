import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id_menu: number;

  @Column()
  nombre_menu: string;

  @Column({ nullable: true })
  id_padre: number;

  @Column()
  accion: string;

  @Column()
  orden: number;
}

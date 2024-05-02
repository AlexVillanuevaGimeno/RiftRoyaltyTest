import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permiso } from './permiso.entity';
import { Rol } from './rol.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  username: string;

  @Column()
  nombre: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  summoner_name: string;

  @Column()
  fecha_nacimiento: Date;

  // Relación ManyToMany con Rol
  @ManyToMany(() => Rol)
  @JoinTable()
  roles: Rol[];

  // Relación ManyToMany con Permiso
  @ManyToMany(() => Permiso)
  @JoinTable()
  permisos: Permiso[];
}

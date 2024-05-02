import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from './usuario.entity';
@Entity()
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column()
  nombre_rol: string;

  @Column({ nullable: true })
  descripcion: string;

  // Relación ManyToMany con Usuario
  @ManyToMany(() => Usuario, usuario => usuario.roles)
  usuarios: Usuario[];
}

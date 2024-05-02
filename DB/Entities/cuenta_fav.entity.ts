import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from './usuario.entity';
@Entity()
export class CuentaFav {
  @PrimaryGeneratedColumn()
  id_cuenta_fav: number;

  @Column()
  nombre_cuenta: string;

  // Relación ManyToMany con Usuario
  @ManyToMany(() => Usuario, usuario => usuario.cuentasFav)
  @JoinTable()
  usuarios: Usuario[];
}

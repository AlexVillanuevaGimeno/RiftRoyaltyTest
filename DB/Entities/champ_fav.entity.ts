import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from './usuario.entity';
@Entity()
export class ChampFav {
  @PrimaryGeneratedColumn()
  id_champ_fav: number;

  @Column()
  nombre_champ: string;

  @Column({ nullable: true })
  descripcion_champ: string;

  @Column()
  icon_champion: string;

  @Column()
  splashart_champ: string;

  // Relación ManyToMany con Usuario
  @ManyToMany(() => Usuario, usuario => usuario.champsFav)
  @JoinTable()
  usuarios: Usuario[];
}

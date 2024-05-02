import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from './usuario.entity';
@Entity()
export class ItemFav {
  @PrimaryGeneratedColumn()
  id_item_fav: number;

  @Column()
  nombre_item: string;

  @Column({ nullable: true })
  descripcion_item: string;

  @Column()
  imagen_item: string;

  @Column({ nullable: true })
  imagen_compo_item: string;

  // Relación ManyToMany con Usuario
  @ManyToMany(() => Usuario, usuario => usuario.itemsFav)
  @JoinTable()
  usuarios: Usuario[];
}

import { Entidade } from '@/shared/objetos/clases/entidades/entidade';
import { Column, Entity } from 'typeorm';

@Entity('usuarios')
export class Usuario extends Entidade<Usuario> {
  @Column()
  email: string;
  @Column()
  senha: string;
}

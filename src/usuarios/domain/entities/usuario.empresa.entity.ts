import { Entidade } from '@/shared/objetos/classes/entidades/entidade';
import { Column, Entity, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Empresa } from '@/empresas/domain/entities/empresa.entity';

@Entity('usuarios_empresas')
export class UsuarioEmpresa extends Entidade<UsuarioEmpresa> {
  @OneToMany(() => Usuario, (usuario) => usuario.empresa)
  usuarios: Usuario[];
  @OneToMany(() => Empresa, (empresa) => empresa.usuario)
  empresas: Empresa[];
  @Column()
  perfil: string;
}

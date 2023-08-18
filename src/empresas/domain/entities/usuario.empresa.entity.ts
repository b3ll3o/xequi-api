import { Entidade } from '@/shared/objetos/classes/entidades/entidade';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Empresa } from './empresa.entity';
import { PerfilUsuarioEmpresaEnum } from '../enums/perfil.usuario.empresa.enum';

@Entity('usuarios_empresas')
export class UsuarioEmpresa extends Entidade<UsuarioEmpresa> {
  @ManyToOne(() => Usuario, (usuario) => usuario.empresas)
  usuario: Usuario;
  @ManyToOne(() => Empresa, (empresa) => empresa.usuarios)
  empresa: Empresa;
  @Column()
  perfil: PerfilUsuarioEmpresaEnum;
}

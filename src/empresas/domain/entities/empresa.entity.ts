import { EntidadeNotificavel } from '@/shared/objetos/classes/entidades/entidade.notificavel';
import { CampoJaCadastradoErro } from '@/shared/objetos/classes/erros/campo.ja.cadastrado.erro';
import { Column, Entity, OneToMany } from 'typeorm';
import { UsuarioEmpresa } from './usuario.empresa.entity';

@Entity('empresas')
export class Empresa extends EntidadeNotificavel<Empresa> {
  @Column()
  nome: string;
  @OneToMany(() => UsuarioEmpresa, (usuarioEmpresa) => usuarioEmpresa.usuario)
  usuarios: UsuarioEmpresa[];

  podeSerCadastrada(empresa: Empresa): boolean {
    if (!empresa) {
      return true;
    }
    this._notificacaoErro.adicionaErros([new CampoJaCadastradoErro('nome')]);
    return false;
  }
}

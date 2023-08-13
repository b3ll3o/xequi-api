import { EntidadeNotificavel } from '@/shared/objetos/classes/entidades/entidade.notificavel';
import { CampoJaCadastradoErro } from '@/shared/objetos/classes/erros/campo.ja.cadastrado.erro';
import { UsuarioEmpresa } from '@/usuarios/domain/entities/usuario.empresa.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('empresas')
export class Empresa extends EntidadeNotificavel<Empresa> {
  @Column()
  nome: string;
  @ManyToOne(() => UsuarioEmpresa, (usuarioEmpresa) => usuarioEmpresa.usuarios)
  usuario?: string;

  podeSerCadastrada(empresa: Empresa): boolean {
    if (!empresa) {
      return true;
    }
    this._notificacaoErro.adicionaErros([new CampoJaCadastradoErro('nome')]);
    return false;
  }
}

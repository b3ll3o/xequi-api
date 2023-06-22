import { EntidadeNotificavel } from '@/shared/objetos/classes/entidades/entidade.notificavel';
import { CampoJaCadastradoErro } from '@/shared/objetos/classes/erros/campo.ja.cadastrado.erro';
import { Column, Entity } from 'typeorm';

@Entity('usuarios')
export class Usuario extends EntidadeNotificavel<Usuario> {
  @Column()
  email: string;
  @Column()
  senha: string;

  podeSerCadastrado(usuario: Usuario): boolean {
    if (!usuario) {
      return true;
    }
    this._notificacaoErro.adicionaErros([new CampoJaCadastradoErro('email')]);
    return false;
  }
}

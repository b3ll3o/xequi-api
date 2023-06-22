import { EntidadeNotificavel } from '@/shared/objetos/classes/entidades/entidade.notificavel';
import { Erro } from '@/shared/objetos/classes/erro';
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
    this._notificacaoErro.adicionaErros([
      new Erro('email', ['E-mail já cadastrado']),
    ]);
    return false;
  }
}

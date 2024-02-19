import { Column, Entity, ManyToMany } from 'typeorm';
import { Perfil } from './perfil.entity';
import { EntidadeNotificavelRastreavel } from '@/shared/objetos/classes/entidades/entidade.notificavel.rastreavel';
import { CampoJaCadastradoErro } from '@/shared/objetos/classes/erros/campo.ja.cadastrado.erro';

@Entity('autorizacoes')
export class Autorizacao extends EntidadeNotificavelRastreavel<Autorizacao> {
  @Column()
  nome: string;
  @ManyToMany(() => Perfil, (perfil) => perfil.autorizacoes)
  perfis: Perfil[];

  podeSerCadastrada(autorizao: Autorizacao): boolean {
    if (!autorizao) {
      return true;
    }
    this._notificacaoErro.adicionaErros([new CampoJaCadastradoErro('nome')]);
    return false;
  }
}

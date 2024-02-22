import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Autorizacao } from './autorizao.entity';
import { CampoJaCadastradoErro } from '@/shared/objetos/classes/erros/campo.ja.cadastrado.erro';
import { EntidadeNotificavelRastreavel } from '@/shared/objetos/classes/entidades/entidade.notificavel.rastreavel';

@Entity('perfis')
export class Perfil extends EntidadeNotificavelRastreavel<Perfil> {
  @Column()
  nome: string;
  @ManyToMany(() => Autorizacao, (autorizao) => autorizao.perfis)
  @JoinTable()
  autorizacoes: Autorizacao[];

  podeSerCadastrado(perfil: Perfil): boolean {
    if (!perfil) {
      return true;
    }
    this._notificacaoErro.adicionaErros([new CampoJaCadastradoErro('nome')]);
    return false;
  }
}

import { Autorizacao } from '@/auth/domain/entities/autorizao.entity';

export class AutorizaoStub {

  static NOME_AUTORIZAO = 'nome_autorizacao';
  static PERFIS_AUTORIZACAO = [];
  static ID = 1;

  static nova(
    autorizacao: Autorizacao = new Autorizacao({
      nome: this.NOME_AUTORIZAO,
      perfis: this.PERFIS_AUTORIZACAO,
    }),
  ): Autorizacao {
    return autorizacao;
  }

  static cadastrada(autorizacao: Autorizacao = new Autorizacao({
    id: this.ID,
    nome: this.NOME_AUTORIZAO,
    perfis: this.PERFIS_AUTORIZACAO
  })){
    return autorizacao
  }
}

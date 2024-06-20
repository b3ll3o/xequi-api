import { Perfil } from '@/auth/domain/entities/perfil.entity';

export class PerfilStub {
  static NOME_PERFIL = 'nome_perfil';
  static AUTORIZACAO_PERFIS = [];
  static ID = 1;

  static novo(
    perfil: Perfil = new Perfil({
      nome: this.NOME_PERFIL,
      autorizacoes: this.AUTORIZACAO_PERFIS,
    }),
  ): Perfil {
    return perfil;
  }

  static cadastrado(
    perfil: Perfil = new Perfil({
      id: 1,
      nome: this.NOME_PERFIL,
      autorizacoes: this.AUTORIZACAO_PERFIS,
    }),
  ) {
    return perfil;
  }

  static invalido(): Perfil {
    const perfil = this.cadastrado();
    perfil.podeSerCadastrado(this.cadastrado());
    return perfil;
  }
}

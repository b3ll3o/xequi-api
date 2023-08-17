import { Empresa } from '@/empresas/domain/entities/empresa.entity';

export class EmpresaStub {
  static NOME = 'nomeEmpresa';
  static ID = 1;

  static nova(
    empresa: Empresa = new Empresa({
      id: null,
      nome: this.NOME,
    }),
  ): Empresa {
    return empresa;
  }

  static cadastrada(
    empresa: Empresa = new Empresa({
      id: this.ID,
      nome: this.NOME,
    }),
  ): Empresa {
    return empresa;
  }

  static invalida(
    empresa: Empresa = new Empresa({
      id: this.ID,
      nome: this.NOME,
    }),
  ): Empresa {
    if (!empresa) {
      empresa = this.nova();
    }
    empresa.podeSerCadastrada(this.cadastrada());
    return empresa;
  }
}

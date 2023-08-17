import { EmpresaStub } from '@/empresas/test/stubs/entities/empresa.entity.stub';

describe('Empresa', () => {
  describe('podeSerCadastrada', () => {
    it('deve return true quando o parametro empresa for igual undefined', () => {
      expect(EmpresaStub.nova().podeSerCadastrada(undefined)).toBeTruthy();
    });

    it('deve return true quando o parametro empresa for igual null', () => {
      expect(EmpresaStub.nova().podeSerCadastrada(null)).toBeTruthy();
    });

    it('deve return false quando o parametro empresa for igual outra empresa', () => {
      const empresa = EmpresaStub.nova();
      expect(empresa.podeSerCadastrada(EmpresaStub.cadastrada())).toBeFalsy();
      expect(empresa.invalido()).toBeTruthy();
    });
  });
});

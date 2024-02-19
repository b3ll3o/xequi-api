import { AutorizaoStub } from "@/auth/test/stubs/domain/entities/autorizacao.entity.stub";

describe('Autorizacao', () => {
  describe('podeSerCadastrada', () => {
    it('deve retorna true quando autorização for igual a undefined', () => {
      const autorizacao = AutorizaoStub.nova();
      expect(autorizacao.podeSerCadastrada(undefined)).toBeTruthy();
    });

    it('deve retorna true quando autorização for igual a null', () => {
      const autorizacao = AutorizaoStub.nova();
      expect(autorizacao.podeSerCadastrada(null)).toBeTruthy();
    });

    it('deve retorna false e adicionar novo erro quando autorização passado for valido', () => {
      const autorizacao = AutorizaoStub.nova();
      expect(autorizacao.podeSerCadastrada(AutorizaoStub.cadastrada())).toBeFalsy();
      expect(autorizacao.invalido()).toBeTruthy();
      expect(autorizacao.erros).toHaveLength(1);
    });
  });
});

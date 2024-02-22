import { PerfilStub } from '@/auth/test/stubs/domain/entities/perfil.entity.stub';

describe('Perfil', () => {
  describe('podeSerCadastrado', () => {
    it('deve retorna true quando perfil for igual a undefined', () => {
      const perfil = PerfilStub.novo();
      expect(perfil.podeSerCadastrada(undefined)).toBeTruthy();
    });

    it('deve retorna true quando perfil for igual a null', () => {
      const perfil = PerfilStub.novo();
      expect(perfil.podeSerCadastrada(null)).toBeTruthy();
    });

    it('deve retorna false e adicionar novo erro quando perfil passado for valido', () => {
      const perfil = PerfilStub.novo();
      expect(perfil.podeSerCadastrada(PerfilStub.cadastrado())).toBeFalsy();
      expect(perfil.invalido()).toBeTruthy();
      expect(perfil.erros).toHaveLength(1);
    });
  });
});

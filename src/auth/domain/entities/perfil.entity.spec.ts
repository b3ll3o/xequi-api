import { PerfilStub } from '@/auth/test/stubs/domain/entities/perfil.entity.stub';

describe('Perfil', () => {
  describe('podeSerCadastrado', () => {
    it('deve retorna true quando perfil for igual a undefined', () => {
      const perfil = PerfilStub.novo();
      expect(perfil.podeSerCadastrado(undefined)).toBeTruthy();
    });

    it('deve retorna true quando perfil for igual a null', () => {
      const perfil = PerfilStub.novo();
      expect(perfil.podeSerCadastrado(null)).toBeTruthy();
    });

    it('deve retorna false e adicionar novo erro quando perfil passado for valido', () => {
      const perfil = PerfilStub.novo();
      expect(perfil.podeSerCadastrado(PerfilStub.cadastrado())).toBeFalsy();
      expect(perfil.invalido()).toBeTruthy();
      expect(perfil.erros).toHaveLength(1);
    });
  });
});

import { UsuarioStub } from '@/usuarios/test/stubs/entities /usuario.entity.stub';
import { UsuariosRepository } from '../repositories/usuarios.repository';
import { UnicoUsuarioValidator } from './unico.usuario.validator';

describe('UnicoUsuarioValidator', () => {
  let repository: UsuariosRepository;
  let validator: UnicoUsuarioValidator;

  beforeAll(() => {
    repository = new UsuariosRepository(null);
    validator = new UnicoUsuarioValidator(repository);
  });

  describe('valida', () => {
    it('deve retornar um resultado valido', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));

      const { notificacaoErros } = await validator.valida(UsuarioStub.novo());
      expect(notificacaoErros.valido()).toBeTruthy();
    });

    it('deve retornar um resultado invalido', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));

      const { notificacaoErros } = await validator.valida(UsuarioStub.novo());
      expect(notificacaoErros.valido()).toBeFalsy();
    });
  });
});

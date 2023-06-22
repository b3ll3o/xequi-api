import { UsuariosService } from '@/usuarios/domain/services/usuarios.service';
import { UsuariosApplicationService } from './usuarios.application.service';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';

describe('UsuariosApplicationService', () => {
  let service: UsuariosApplicationService;
  let usuariosService: UsuariosService;

  beforeEach(() => {
    usuariosService = new UsuariosService(null);
    service = new UsuariosApplicationService(usuariosService);
  });
  describe('cadastra', () => {
    it('deve retorna usuario cadastrado', async () => {
      jest
        .spyOn(usuariosService, 'cadastra')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));
      const usuario = await service.cadastra(UsuarioStub.novo());
      expect(usuario.id).toBe(UsuarioStub.ID);
      expect(usuario.email).toBe(UsuarioStub.EMAIL);
    });

    it('deve jogar um erro quando usuario estiver invalido', async () => {
      jest
        .spyOn(usuariosService, 'cadastra')
        .mockImplementation(() => Promise.resolve(UsuarioStub.invalido()));
      await expect(service.cadastra(UsuarioStub.novo())).rejects.toThrow();
    });
  });
});

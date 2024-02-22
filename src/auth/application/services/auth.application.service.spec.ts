import { UsuariosApplicationService } from '@/usuarios/application/services/usuarios.application.service';
import { JwtService } from '@nestjs/jwt';
import { AuthApplicationService } from './auth.application.service';
import { UsuarioAutenticavelDtoStub } from '@/auth/test/stubs/dtos/usuario.autenticavel.dto.stub';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';
import { AuthService } from '@/auth/domain/services/auth.service';
import { AutorizaoStub } from '@/auth/test/stubs/domain/entities/autorizacao.entity.stub';
import { PerfilStub } from '@/auth/test/stubs/domain/entities/perfil.entity.stub';

describe('AuthApplicationService', () => {
  let usuarioApplicationService: UsuariosApplicationService;
  let jwtService: JwtService;
  let service: AuthApplicationService;
  let authService: AuthService;

  beforeEach(() => {
    usuarioApplicationService = new UsuariosApplicationService(null);
    jwtService = new JwtService();
    authService = new AuthService(null, null);
    service = new AuthApplicationService(
      usuarioApplicationService,
      jwtService,
      authService,
    );
  });

  describe('login', () => {
    it('deve jogar um erro quando usuario não for autenticado', async () => {
      jest
        .spyOn(usuarioApplicationService, 'autentica')
        .mockImplementation(() => Promise.resolve(undefined));
      await expect(
        service.login(UsuarioAutenticavelDtoStub.novo()),
      ).rejects.toThrow();
    });

    it('deve retorna um access_token quando usuario estiver autenticado', async () => {
      jest
        .spyOn(usuarioApplicationService, 'autentica')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));
      jest
        .spyOn(jwtService, 'signAsync')
        .mockImplementation(() => Promise.resolve(''));
      const token = await service.login(UsuarioAutenticavelDtoStub.novo());
      expect(token.access_token).toBe('');
    });
  });

  describe('criaNovaAutorizacao', () => {
    it('deve retorna autorização cadastrado', async () => {
      jest
        .spyOn(authService, 'criaNovaAutorizacao')
        .mockImplementation(() => Promise.resolve(AutorizaoStub.cadastrada()));
      const autorizacao = await service.criaNovaAutorizacao(
        AutorizaoStub.nova(),
      );
      expect(autorizacao.id).toBe(AutorizaoStub.ID);
      expect(autorizacao.nome).toBe(AutorizaoStub.NOME_AUTORIZAO);
    });

    it('deve jogar um erro quando autorização estiver invalido', async () => {
      jest
        .spyOn(authService, 'criaNovaAutorizacao')
        .mockImplementation(() => Promise.resolve(AutorizaoStub.invalida()));
      await expect(
        service.criaNovaAutorizacao(AutorizaoStub.nova()),
      ).rejects.toThrow();
    });
  });

  describe('criaNovoPerfil', () => {
    it('deve retorna perfil cadastrado', async () => {
      jest
        .spyOn(authService, 'criaNovoPerfil')
        .mockImplementation(() => Promise.resolve(PerfilStub.cadastrado()));
      const perfil = await service.criaNovoPerfil(PerfilStub.novo());
      expect(perfil.id).toBe(PerfilStub.ID);
      expect(perfil.nome).toBe(PerfilStub.NOME_PERFIL);
    });

    it('deve jogar um erro quando perfil estiver invalido', async () => {
      jest
        .spyOn(authService, 'criaNovoPerfil')
        .mockImplementation(() => Promise.resolve(PerfilStub.invalido()));
      await expect(service.criaNovoPerfil(PerfilStub.novo())).rejects.toThrow();
    });
  });
});

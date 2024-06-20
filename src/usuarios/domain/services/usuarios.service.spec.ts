import { NotificacaoErro } from '@/shared/domain/objetos/classes/erros/notificacao.erro';
import { CampoJaCadastradoErro } from '@/shared/domain/objetos/classes/erros/shared/campo.ja.cadastrado.erro';
import { ResultadoValidator } from '@/shared/domain/validators/resultado.validator';
import { UsuarioStub } from '@/usuarios/test/stubs/entities /usuario.entity.stub';
import { UsuariosRepository } from '../repositories/usuarios.repository';
import { UnicoUsuarioValidator } from '../validators/unico.usuario.validator';
import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let repository: UsuariosRepository;
  let unicoUsuarioValidator: UnicoUsuarioValidator;

  beforeAll(async () => {
    repository = new UsuariosRepository(null);
    unicoUsuarioValidator = new UnicoUsuarioValidator(null);
    service = new UsuariosService(repository, unicoUsuarioValidator);
  });

  describe('cadastra', () => {
    it('deve cadastrar novo usuario', async () => {
      jest
        .spyOn(unicoUsuarioValidator, 'valida')
        .mockImplementation(() =>
          Promise.resolve(
            new ResultadoValidator(new NotificacaoErro(), UsuarioStub.novo()),
          ),
        );
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));

      const { resultado } = await service.cadastra(UsuarioStub.novo());

      expect(resultado.id).toBe(UsuarioStub.ID);
    });

    it('não deve cadastrar usuario com email ja cadastrado', async () => {
      jest
        .spyOn(unicoUsuarioValidator, 'valida')
        .mockImplementation(() =>
          Promise.resolve(
            new ResultadoValidator(
              new NotificacaoErro([new CampoJaCadastradoErro('email')]),
              UsuarioStub.novo(),
            ),
          ),
        );

      const { resultado, notificacaoErros } = await service.cadastra(
        UsuarioStub.novo(),
      );

      expect(resultado.id).toBeNull();
      expect(notificacaoErros.invalido()).toBeTruthy();
    });
  });
});

import { AutorizaoStub } from '@/auth/test/stubs/domain/entities/autorizacao.entity.stub';
import { PerfilStub } from '@/auth/test/stubs/domain/entities/perfil.entity.stub';
import { AutorizacoesRepository } from '../repositories/autorizacoes.repository';
import { PerfisRepository } from '../repositories/perfis.repository';
import { UnicaAutorizacaoCadastradaValidator } from '../validators/unica.autorizacao.cadastrada.validator';
import { UnicoPerfilCadastradoValidator } from '../validators/unico.perfil.cadastrado.validator';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let perfilRepository: PerfisRepository;
  let autorizacaoRepository: AutorizacoesRepository;
  let service: AuthService;
  let unicaAutorizacaoCadastradaValidator: UnicaAutorizacaoCadastradaValidator;
  let unicoPerfilCadastradoValidator: UnicoPerfilCadastradoValidator;

  beforeAll(async () => {
    perfilRepository = new PerfisRepository(null);
    autorizacaoRepository = new AutorizacoesRepository(null);
    unicaAutorizacaoCadastradaValidator =
      new UnicaAutorizacaoCadastradaValidator(null);
    unicoPerfilCadastradoValidator = new UnicoPerfilCadastradoValidator(null);
    service = new AuthService(
      autorizacaoRepository,
      perfilRepository,
      unicoPerfilCadastradoValidator,
      unicaAutorizacaoCadastradaValidator,
    );
  });

  describe('criaNovaAutorizao', () => {
    it('deve cadastrar nova autorização', async () => {
      jest
        .spyOn(autorizacaoRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(autorizacaoRepository, 'save')
        .mockImplementation(() => Promise.resolve(AutorizaoStub.cadastrada()));

      const { resultado } = await service.criaNovaAutorizacao(
        AutorizaoStub.nova(),
      );

      expect(resultado.id).toBe(AutorizaoStub.ID);
    });

    it('não deve cadastrar autorizacao com nome ja cadastrado', async () => {
      jest
        .spyOn(autorizacaoRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(AutorizaoStub.cadastrada()));

      const { notificacaoErros } = await service.criaNovaAutorizacao(
        AutorizaoStub.nova(),
      );

      expect(notificacaoErros.invalido()).toBeTruthy();
    });
  });

  describe('criaNovoPerfil', () => {
    it('deve cadastrar novo perfil', async () => {
      jest
        .spyOn(perfilRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(perfilRepository, 'save')
        .mockImplementation(() => Promise.resolve(PerfilStub.cadastrado()));

      const { resultado } = await service.criaNovoPerfil(PerfilStub.novo());

      expect(resultado.id).toBe(PerfilStub.ID);
    });

    it('não deve cadastrar perfil com nome ja cadastrado', async () => {
      jest
        .spyOn(perfilRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(PerfilStub.cadastrado()));

      const { notificacaoErros } = await service.criaNovoPerfil(
        PerfilStub.novo(),
      );

      expect(notificacaoErros.invalido()).toBeTruthy();
    });
  });
});

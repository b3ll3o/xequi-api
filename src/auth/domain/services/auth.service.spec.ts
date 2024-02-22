import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Perfil } from '../entities/perfil.entity';
import { Autorizacao } from '../entities/autorizao.entity';
import { AuthService } from './auth.service';
import { AutorizaoStub } from '@/auth/test/stubs/domain/entities/autorizacao.entity.stub';
import { PerfilStub } from '@/auth/test/stubs/domain/entities/perfil.entity.stub';

describe('AuthService', () => {
  let perfilRepository: Repository<Perfil>;
  let autorizacaoRepository: Repository<Autorizacao>;
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Perfil, Autorizacao],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Perfil, Autorizacao]),
      ],
    }).compile();

    perfilRepository = module.get(getRepositoryToken(Perfil));
    autorizacaoRepository = module.get(getRepositoryToken(Autorizacao));
    service = new AuthService(autorizacaoRepository, perfilRepository);
  });

  describe('criaNovaAutorizao', () => {
    it('deve cadastrar nova autorização', async () => {
      jest
        .spyOn(autorizacaoRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(autorizacaoRepository, 'save')
        .mockImplementation(() => Promise.resolve(AutorizaoStub.cadastrada()));

      const autorizacao = await service.criaNovaAutorizacao(
        AutorizaoStub.nova(),
      );

      expect(autorizacao.id).toBe(AutorizaoStub.ID);
    });

    it('não deve cadastrar autorizacao com nome ja cadastrado', async () => {
      jest
        .spyOn(autorizacaoRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(AutorizaoStub.cadastrada()));

      const autorizacao = await service.criaNovaAutorizacao(
        AutorizaoStub.nova(),
      );

      expect(autorizacao.invalido()).toBeTruthy();
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

      const perfil = await service.criaNovoPerfil(PerfilStub.novo());

      expect(perfil.id).toBe(PerfilStub.ID);
    });

    it('não deve cadastrar perfil com nome ja cadastrado', async () => {
      jest
        .spyOn(perfilRepository, 'findOne')
        .mockImplementation(() => Promise.resolve(PerfilStub.cadastrado()));

      const perfil = await service.criaNovoPerfil(PerfilStub.novo());

      expect(perfil.invalido()).toBeTruthy();
    });
  });
});

import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { UsuariosModule } from '@/usuarios/usuarios.module';
import { ValidationPipeCustom } from '@/shared/pipes/validation.pipe.custom';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';
import { Empresa } from '@/empresas/domain/entities/empresa.entity';
import { UsuarioEmpresa } from '@/empresas/domain/entities/usuario.empresa.entity';
import { AuthModule } from '@/auth/auth.module';
import { JwtGuard } from '@/auth/application/guards/jwt.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

const BASE_URL = '/auth';

describe('auth', () => {
  let app: INestApplication;
  let repository: Repository<Usuario>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsuariosModule,
        JwtModule,
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario, Empresa, UsuarioEmpresa],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Usuario, Empresa, UsuarioEmpresa]),
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Usuario));
    jwtService = module.get(JwtService);

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipeCustom());
    app.useGlobalGuards(new JwtGuard(jwtService, new Reflector()));
    await app.init();
  });

  describe('login', () => {
    const BASE_URL_LOGIN = `${BASE_URL}/login`;

    it('deve fazer o login de um usuario já cadastrado', async () => {
      const usuarioCadastradoSenhaHash =
        await UsuarioStub.cadastradoHashSenha();
      await repository.save(usuarioCadastradoSenhaHash);
      return request(app.getHttpServer())
        .post(BASE_URL_LOGIN)
        .send(UsuarioStub.novo())
        .expect(200);
    });

    it('não deve fazer o loginde um usuario não cadastrado', async () => {
      return request(app.getHttpServer())
        .post(BASE_URL_LOGIN)
        .send(UsuarioStub.novo())
        .expect(401);
    });

    it('não deve fazer o login de um usuario com a senha errada', async () => {
      const usuarioCadastradoSenhaHash =
        await UsuarioStub.cadastradoHashSenha();
      await repository.save(usuarioCadastradoSenhaHash);
      return request(app.getHttpServer())
        .post(BASE_URL_LOGIN)
        .send(
          UsuarioStub.novo(
            new Usuario({
              email: UsuarioStub.EMAIL,
              senha: UsuarioStub.SENHA_2,
            }),
          ),
        )
        .expect(401);
    });
  });

  describe('profile', () => {
    const TOKEN =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIiwiaWQiOjEsImlhdCI6MTcwNjkwMzE2MiwiZXhwIjoxNzA3NTA3OTYyfQ.-4ajYr4qS_einyU0kPRIsga1ZdjwT7IuwkZmwts-o3g';
    const BASE_URL_PROFILE = `${BASE_URL}/profile`;

    it('deve retorna os dados de um usuario cadastrado', async () => {
      const usuarioCadastradoSenhaHash =
        await UsuarioStub.cadastradoHashSenha();
      await repository.save(usuarioCadastradoSenhaHash);
      return request(app.getHttpServer())
        .get(BASE_URL_PROFILE)
        .send(UsuarioStub.novo())
        .auth(TOKEN, { type: 'bearer' })
        .expect(200)
        .expect({
          sub: 1,
          email: 'teste@teste.com',
          id: 1,
          iat: 1706903162,
          exp: 1707507962,
        });
    });

    it('deve retorna 401 se o token for invalido', async () => {
      return request(app.getHttpServer())
        .get(BASE_URL_PROFILE)
        .send(UsuarioStub.novo())
        .auth(TOKEN + '123', { type: 'bearer' })
        .expect(401);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});

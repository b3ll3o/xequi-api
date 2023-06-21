import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { UsuariosService } from './usuarios.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

describe('UsuariosService', () => {
  let repository: Repository<Usuario>;
  let service: UsuariosService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario]),
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Usuario));
    service = new UsuariosService(repository);
  });

  describe('cadastra', () => {
    it('deve cadastrar novo usuario', () => {
      const usuario = UsuarioStub.novo();
    });
  });
});

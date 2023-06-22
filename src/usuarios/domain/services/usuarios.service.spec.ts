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
    it('deve cadastrar novo usuario', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));

      const usuario = await service.cadastra(UsuarioStub.novo());

      expect(usuario.id).toBe(UsuarioStub.ID);
    });

    it('não deve cadastrar usuario com email ja cadastrado', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(UsuarioStub.cadastrado()));

      const usuario = await service.cadastra(UsuarioStub.novo());

      expect(usuario.id).toBeNull();
      expect(usuario.invalido()).toBeTruthy();
    });
  });
});

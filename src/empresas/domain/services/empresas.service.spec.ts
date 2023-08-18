import { EmpresaStub } from '@/empresas/test/stubs/entities/empresa.entity.stub';
import { Repository } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';
import { EmpresasService } from './empresas.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { UsuariosEmpresasService } from './usuarios.empresas.service';
import { UsuarioEmpresa } from '../entities/usuario.empresa.entity';
import { UsuarioEmpresaStub } from '@/empresas/test/stubs/entities/usuario.empresa.entity.stub';

describe('EmpresasService', () => {
  let repository: Repository<Empresa>;
  let service: EmpresasService;
  let usuariosEmpresasService: UsuariosEmpresasService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresasService, UsuariosEmpresasService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario, Empresa, UsuarioEmpresa],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Usuario, Empresa, UsuarioEmpresa]),
      ],
    }).compile();

    usuariosEmpresasService = new UsuariosEmpresasService(null)
    repository = module.get(getRepositoryToken(Empresa));
    service = new EmpresasService(repository, usuariosEmpresasService);
  });

  describe('cadastra', () => {
    it('deve cadastrar uma nova empresa', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(EmpresaStub.cadastrada()));
        jest
        .spyOn(usuariosEmpresasService, 'cadastra')
        .mockImplementation(() => Promise.resolve(UsuarioEmpresaStub.cadastrado()));
      const empresa = await service.cadastra(1, EmpresaStub.nova());
      expect(empresa.id).toBe(1);
      expect(empresa.nome).toBe(EmpresaStub.NOME);
    });

    it('não deve cadastrar duas empresas com o mesmo nome', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(EmpresaStub.cadastrada()));
      const empresa = await service.cadastra(1, EmpresaStub.nova());
      expect(empresa.invalido()).toBeTruthy();
    });
  });
});

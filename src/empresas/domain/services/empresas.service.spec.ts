import { EmpresaStub } from '@/empresas/test/stubs/entities/empresa.entity.stub';
import { Repository } from 'typeorm';
import { Empresa } from '../entities/empresa.entity';
import { EmpresasService } from './empresas.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { UsuarioEmpresa } from '@/usuarios/domain/entities/usuario.empresa.entity';

describe('EmpresasService', () => {
  let repository: Repository<Empresa>;
  let service: EmpresasService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresasService],
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

    repository = module.get(getRepositoryToken(Empresa));
    service = new EmpresasService(repository);
  });

  describe('cadastra', () => {
    it('deve cadastrar uma nova empresa', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(null));
      jest
        .spyOn(repository, 'save')
        .mockImplementation(() => Promise.resolve(EmpresaStub.cadastrada()));
      const empresa = await service.cadastra(EmpresaStub.nova());
      expect(empresa.id).toBe(1);
      expect(empresa.nome).toBe(EmpresaStub.NOME);
    });

    it('não deve cadastrar duas empresas com o mesmo nome', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockImplementation(() => Promise.resolve(EmpresaStub.cadastrada()));
      const empresa = await service.cadastra(EmpresaStub.nova());
      expect(empresa.invalido()).toBeTruthy();
    });
  });
});

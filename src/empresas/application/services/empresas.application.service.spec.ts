import { EmpresasService } from '@/empresas/domain/services/empresas.service';
import { EmpresasApplicationService } from './empresas.application.service';
import { EmpresaStub } from '@/empresas/test/stubs/entities/empresa.entity.stub';

describe('EmpresasApplicationService', () => {
  let service: EmpresasApplicationService;
  let empresasService: EmpresasService;

  beforeAll(() => {
    empresasService = new EmpresasService(null);
    service = new EmpresasApplicationService(empresasService);
  });

  describe('cadastra', () => {
    it('deve retorna empresa cadastrada', async () => {
      jest
        .spyOn(empresasService, 'cadastra')
        .mockImplementation(() => Promise.resolve(EmpresaStub.cadastrada()));
      const empresa = await service.cadastra(EmpresaStub.nova());
      expect(empresa.id).toBe(EmpresaStub.ID);
      expect(empresa.nome).toBe(EmpresaStub.NOME);
    });

    it('deve jogar um erro quando usuario estiver invalido', async () => {
      jest
        .spyOn(empresasService, 'cadastra')
        .mockImplementation(() => Promise.resolve(EmpresaStub.invalida()));
      await expect(service.cadastra(EmpresaStub.nova())).rejects.toThrow();
    });
  });
});

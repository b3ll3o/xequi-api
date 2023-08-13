import { Injectable } from '@nestjs/common';
import { NovaEmpresaDto } from '../dtos/nova.empresa.dto';
import { EmpresaCadastradaDto } from '../dtos/empresa.cadastrada.dto';
import { Empresa } from '@/empresas/domain/entities/empresa.entity';
import { EmpresasService } from '@/empresas/domain/services/empresas.service';
import { BadRequestCustomException } from '@/shared/exceptions/bad.request.custom.exception';

@Injectable()
export class EmpresasApplicationService {
  constructor(private readonly empresasService: EmpresasService) {}

  async cadastra(
    novaEmpresaDto: NovaEmpresaDto,
  ): Promise<EmpresaCadastradaDto> {
    const { nome } = novaEmpresaDto;
    const empresa = await this.empresasService.cadastra(new Empresa({ nome }));
    if (empresa.invalido()) {
      throw new BadRequestCustomException(empresa.erros);
    }
    return new EmpresaCadastradaDto(empresa);
  }
}

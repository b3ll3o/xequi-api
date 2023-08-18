import { Body, Controller, Post, Request } from '@nestjs/common';
import { NovaEmpresaDto } from '../application/dtos/nova.empresa.dto';
import { EmpresaCadastradaDto } from '../application/dtos/empresa.cadastrada.dto';
import { EmpresasApplicationService } from '../application/services/empresas.application.service';
import { UsuarioLogadoDto } from '@/auth/application/dtos/usuario.logado.dto';

@Controller('empresas')
export class EmpresasController {
  constructor(
    private readonly empresasApplicationService: EmpresasApplicationService,
  ) {}

  @Post()
  async cadastra(
    @Body() novaEmpresaDto: NovaEmpresaDto,
    @Request() req,
  ): Promise<EmpresaCadastradaDto> {
    const { usuarioLogado }: { usuarioLogado: UsuarioLogadoDto } = req;
    return this.empresasApplicationService.cadastra(
      novaEmpresaDto,
      usuarioLogado,
    );
  }
}

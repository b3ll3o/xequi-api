import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthApplicationService } from '../application/services/auth.application.service';
import { UsuarioAutenticavelDto } from '../application/dtos/usuario.autenticavel.dto';
import { Public } from '../application/guards/public.guard';
import { NovaAutorizaoDto } from '../application/dtos/nova.autorizao.dto';
import { AutorizaoCriadaDto } from '../application/dtos/autorizao.criada.dto';
import { NovoPerfilDto } from '../application/dtos/novo.perfil.dto';
import { PerfilCadastradoDto } from '../application/dtos/perfil.cadastrado.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authApplicationService: AuthApplicationService,
  ) {}

  @Post('autorizacoes')
  criaNovaAutorizacao(
    novaAutorizaoDto: NovaAutorizaoDto,
  ): Promise<AutorizaoCriadaDto> {
    return this._authApplicationService.criaNovaAutorizacao(novaAutorizaoDto);
  }

  @Post('perfis')
  criaNovoPerfil(
    novoPerfilDto: NovoPerfilDto,
  ): Promise<PerfilCadastradoDto> {
    return this._authApplicationService.criaNovoPerfil(novoPerfilDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() usuarioAutenticavelDto: UsuarioAutenticavelDto) {
    return this._authApplicationService.login(usuarioAutenticavelDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.usuarioLogado;
  }
}

import { UsuariosApplicationService } from '@/usuarios/application/services/usuarios.application.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioAutenticavelDto } from '../dtos/usuario.autenticavel.dto';
import { JwtService } from '@nestjs/jwt';
import { NovaAutorizaoDto } from '../dtos/nova.autorizao.dto';
import { AutorizaoCriadaDto } from '../dtos/autorizao.criada.dto';
import { Autorizacao } from '@/auth/domain/entities/autorizao.entity';
import { AuthService } from '@/auth/domain/services/auth.service';
import { BadRequestCustomException } from '@/shared/exceptions/bad.request.custom.exception';
import { NovoPerfilDto } from '../dtos/novo.perfil.dto';
import { PerfilCadastradoDto } from '../dtos/perfil.cadastrado.dto';
import { Perfil } from '@/auth/domain/entities/perfil.entity';
import { PayloadDto } from '../dtos/payload.dto';

@Injectable()
export class AuthApplicationService {
  constructor(
    private readonly _usuarioApplicationService: UsuariosApplicationService,
    private readonly _jwtService: JwtService,
    private readonly _authService: AuthService,
  ) {}

  async login(usuarioAutenticavelDto: UsuarioAutenticavelDto): Promise<any> {
    const usuario = await this._usuarioApplicationService.autentica(
      usuarioAutenticavelDto,
    );
    if (!usuario) {
      throw new UnauthorizedException();
    }
    const payload = new PayloadDto(usuario);
    return {
      access_token: await this._jwtService.signAsync(
        Object.assign({}, payload),
      ),
    };
  }

  async criaNovaAutorizacao(
    novaAutorizaoDto: NovaAutorizaoDto,
  ): Promise<AutorizaoCriadaDto> {
    const { nome } = novaAutorizaoDto;
    const autorizaoCadastrada = await this._authService.criaNovaAutorizacao(
      new Autorizacao({ nome }),
    );
    if (autorizaoCadastrada.invalido()) {
      throw new BadRequestCustomException(autorizaoCadastrada.erros);
    }
    return new AutorizaoCriadaDto(autorizaoCadastrada);
  }

  async criaNovoPerfil(
    novoPerfilDto: NovoPerfilDto,
  ): Promise<PerfilCadastradoDto> {
    const { nome } = novoPerfilDto;
    const perfilCadastrado = await this._authService.criaNovoPerfil(
      new Perfil({ nome }),
    );
    if (perfilCadastrado.invalido()) {
      throw new BadRequestCustomException(perfilCadastrado.erros);
    }
    return new PerfilCadastradoDto(perfilCadastrado);
  }
}

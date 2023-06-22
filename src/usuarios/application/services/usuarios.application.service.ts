import { Injectable } from '@nestjs/common';
import { NovoUsuarioDto } from '../dtos/novo.usuario.dto';
import { UsuarioCadastradoDto } from '../dtos/usuario.cadastrado.dto';
import { UsuariosService } from '@/usuarios/domain/services/usuarios.service';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { BadRequestCustomException } from '@/shared/exceptions/bad.request.custom.exception';

@Injectable()
export class UsuariosApplicationService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async cadastra(
    novoUsuarioDto: NovoUsuarioDto,
  ): Promise<UsuarioCadastradoDto> {
    const { email, senha } = novoUsuarioDto;
    const usuario = await this.usuariosService.cadastra(
      new Usuario({ email, senha }),
    );
    if (usuario.invalido()) {
      throw new BadRequestCustomException(usuario.erros);
    }
    return new UsuarioCadastradoDto(usuario);
  }
}

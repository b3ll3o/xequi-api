import { Controller } from '@nestjs/common';
import { UsuariosApplicationService } from '../application/services/usuarios.application.service';
import { NovoUsuarioDto } from '../application/dtos/novo.usuario.dto';
import { UsuarioCadastradoDto } from '../application/dtos/usuario.cadastrado.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosApplicationService: UsuariosApplicationService,
  ) {}

  async cadastra(
    novoUsuarioDto: NovoUsuarioDto,
  ): Promise<UsuarioCadastradoDto> {
    return this.usuariosApplicationService.cadastra(novoUsuarioDto);
  }
}

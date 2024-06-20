import { BadRequestCustomException } from '@/shared/exceptions /bad.request.custom.exception';
import { UsuariosService } from '@/usuarios/domain/services/usuarios.service';
import { Injectable } from '@nestjs/common';
import { NovoUsuarioDto } from '../dtos /novo.usuario.dto';
import { UsuarioCadastradoDto } from '../dtos /usuario.cadastrado.dto';

@Injectable()
export class UsuariosApplicationService {
  constructor(private readonly usuariosService: UsuariosService) {}

  async cadastra({
    email,
    senha,
  }: NovoUsuarioDto): Promise<UsuarioCadastradoDto> {
    const resultado = await this.usuariosService.cadastra({ email, senha });
    if (resultado.invalido()) {
      throw new BadRequestCustomException(resultado.notificacaoErros.erros);
    }
    return new UsuarioCadastradoDto(resultado.resultado);
  }
}

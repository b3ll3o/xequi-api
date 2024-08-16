import { Objeto } from '@/shared/objetos/objeto';
import { UsuarioCadastradoDto } from '@/usuarios/application/dtos/usuario.cadastrado.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PayloadDto extends Objeto<PayloadDto> {
  @ApiProperty()
  sub: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  id: number;

  constructor(usuario: UsuarioCadastradoDto) {
    const { id, email } = usuario;
    super({
      sub: id,
      id,
      email,
    });
  }
}

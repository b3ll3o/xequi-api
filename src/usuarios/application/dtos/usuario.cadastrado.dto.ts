import { Objeto } from '@/shared/objetos/objeto';
import { Usuario } from '@/usuarios/domain/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioCadastradoDto extends Objeto<UsuarioCadastradoDto> {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;

  constructor(usuario: Usuario) {
    const { id, email } = usuario;
    super({ id, email });
  }
}

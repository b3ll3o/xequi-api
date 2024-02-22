import { Objeto } from '@/shared/objetos/objeto';
import { UsuarioCadastradoDto } from '@/usuarios/application/dtos/usuario.cadastrado.dto';

export class PayloadDto extends Objeto<PayloadDto> {
  sub: number;
  email: string;
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

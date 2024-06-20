import { Objeto } from '@/shared/domain/objetos/classes/objeto';
import { Usuario } from '@prisma/client';

export class UsuarioCadastradoDto extends Objeto<UsuarioCadastradoDto> {
  id: number;
  email: string;

  constructor({ id, email }: Partial<Usuario>) {
    super({ id, email });
  }
}

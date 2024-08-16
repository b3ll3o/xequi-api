import { Perfil } from '@/auth/domain/entities/perfil.entity';
import { Objeto } from '@/shared/objetos/objeto';
import { ApiProperty } from '@nestjs/swagger';

export class PerfilCadastradoDto extends Objeto<PerfilCadastradoDto> {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nome: string;

  constructor(perfil: Perfil) {
    const { id, nome } = perfil;
    super({ id, nome });
  }
}

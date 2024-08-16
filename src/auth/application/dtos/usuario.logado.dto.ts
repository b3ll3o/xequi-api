import { Objeto } from '@/shared/objetos/objeto';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioLogadoDto extends Objeto<UsuarioLogadoDto> {
  @ApiProperty()
  sub: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  id: number;
}

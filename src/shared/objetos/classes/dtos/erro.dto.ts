import { ApiProperty } from '@nestjs/swagger';
import { Objeto } from '../../objeto';
import { Erro } from '../erro';

export class ErroDto extends Objeto<ErroDto> {
  @ApiProperty()
  campo: string;
  @ApiProperty()
  mensagens: string[];

  constructor(erro: Erro) {
    const { campo, mensagens } = erro;
    super({ campo, mensagens });
  }
}

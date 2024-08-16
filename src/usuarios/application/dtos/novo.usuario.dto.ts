import { Objeto } from '@/shared/objetos/objeto';
import { FormatoInvalido } from '@/shared/validation/erros/formato.invalido';
import { PreenchimentoObrigatorio } from '@/shared/validation/erros/preenchimento.obrigado';
import { ApiProperty } from '@nestjs/swagger';

export class NovoUsuarioDto extends Objeto<NovoUsuarioDto> {
  @PreenchimentoObrigatorio()
  @FormatoInvalido()
  @ApiProperty()
  email: string;
  @PreenchimentoObrigatorio()
  @ApiProperty()
  senha: string;
}

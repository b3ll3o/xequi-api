import { Objeto } from '@/shared/objetos/objeto';
import { PreenchimentoObrigatorio } from '@/shared/validation/erros/preenchimento.obrigado';
import { ApiProperty } from '@nestjs/swagger';

export class NovaEmpresaDto extends Objeto<NovaEmpresaDto> {
  @PreenchimentoObrigatorio()
  @ApiProperty()
  nome: string;
}

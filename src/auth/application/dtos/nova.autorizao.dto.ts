import { Objeto } from '@/shared/objetos/objeto';
import { PreenchimentoObrigatorio } from '@/shared/validation/erros/preenchimento.obrigado';

export class NovaAutorizaoDto extends Objeto<NovaAutorizaoDto> {
  @PreenchimentoObrigatorio()
  nome: string;
}

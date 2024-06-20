import { Objeto } from '@/shared/objetos/objeto';
import { PreenchimentoObrigatorio } from '@/shared/validation/erros/preenchimento.obrigado';

export class NovoPerfilDto extends Objeto<NovoPerfilDto> {
  @PreenchimentoObrigatorio()
  nome: string;
}

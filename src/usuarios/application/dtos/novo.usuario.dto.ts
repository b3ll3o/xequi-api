import { Objeto } from '@/shared/objetos/objeto';

export class NovoUsuarioDto extends Objeto<NovoUsuarioDto> {
  email: string;
  senha: string;
}

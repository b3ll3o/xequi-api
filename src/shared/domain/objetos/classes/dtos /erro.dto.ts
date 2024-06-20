import { Erro } from '../erros/erro';
import { Objeto } from '../objeto';

export class ErroDto extends Objeto<ErroDto> {
  campo: string;
  mensagens: string[];

  constructor(erro: Erro) {
    const { campo, mensagens } = erro;
    super({ campo, mensagens });
  }
}

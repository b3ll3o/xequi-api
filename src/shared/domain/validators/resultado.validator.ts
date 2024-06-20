import { NotificacaoErro } from '../objetos/classes/erros/notificacao.erro';

export class ResultadoValidator<T> {
  constructor(
    public notificacaoErros: NotificacaoErro = new NotificacaoErro(),
    public resultado: Partial<T> = undefined,
  ) {}
}

import { Erro } from '../objetos/classes/erros/erro';
import { NotificacaoErro } from '../objetos/classes/erros/notificacao.erro';
import { ResultadoValidator } from './resultado.validator';

export abstract class Validator<T> {
  protected abstract _temErros(objeto: Partial<T>): Promise<Erro[]>;

  valida(
    objeto: Partial<T> | ResultadoValidator<T>,
  ): Promise<ResultadoValidator<T>> {
    return objeto instanceof ResultadoValidator
      ? this.validaResultadoValidator(objeto)
      : this.validaObjeto(objeto);
  }

  private validaObjeto(objeto: Partial<T>): Promise<ResultadoValidator<T>> {
    return this.construiResultado(objeto);
  }

  private validaResultadoValidator(
    objeto: ResultadoValidator<T>,
  ): Promise<ResultadoValidator<T>> {
    return this.construiResultado(objeto.resultado);
  }

  private async construiResultado(objeto: Partial<T>) {
    const erros = await this._temErros(objeto);
    return new ResultadoValidator(new NotificacaoErro(erros), objeto);
  }
}

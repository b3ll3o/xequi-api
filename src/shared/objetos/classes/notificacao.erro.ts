import { Erro } from './erro';

export class NotificacaoErro {
  private _erros: Erro[];

  constructor() {
    this._erros = [];
  }

  get erros(): Erro[] {
    return [...this._erros];
  }

  adicionaErros(erros: Erro[]): void {
    if (erros !== null && erros !== undefined) {
      erros.forEach((e) => this._adicionaErro(e));
    }
  }

  private _adicionaErro(erro: Erro): void {
    const erroAdicionado = this._erros.filter((e) => e.campo === erro.campo)[0];
    if (erroAdicionado !== undefined) {
      erroAdicionado.adicionaNovasMensagens(erro.mensagens);
    } else {
      if (erro !== undefined && erro !== null) {
        this._erros.push(erro);
      }
    }
  }
}

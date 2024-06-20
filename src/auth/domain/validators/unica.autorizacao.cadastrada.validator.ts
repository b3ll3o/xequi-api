import { Erro } from '@/shared/domain/objetos/classes/erros/erro';
import { CampoJaCadastradoErro } from '@/shared/domain/objetos/classes/erros/shared/campo.ja.cadastrado.erro';
import { Validator } from '@/shared/domain/validators/validator';
import { Injectable } from '@nestjs/common';
import { Autorizacao } from '@prisma/client';
import { AutorizacoesRepository } from '../repositories/autorizacoes.repository';

@Injectable()
export class UnicaAutorizacaoCadastradaValidator extends Validator<Autorizacao> {
  constructor(private readonly repository: AutorizacoesRepository) {
    super();
  }

  protected async _temErros({
    nome,
  }: Partial<{ id: number; nome: string }>): Promise<Erro[]> {
    const cadastrado = await this.repository.findOne({
      nome,
    });

    if (cadastrado) {
      return [new CampoJaCadastradoErro('nome')];
    }
    return [];
  }
}

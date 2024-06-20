import { Erro } from '@/shared/domain/objetos/classes/erros/erro';
import { CampoJaCadastradoErro } from '@/shared/domain/objetos/classes/erros/shared/campo.ja.cadastrado.erro';
import { Validator } from '@/shared/domain/validators/validator';
import { Injectable } from '@nestjs/common';
import { Perfil } from '@prisma/client';
import { PerfisRepository } from '../repositories/perfis.repository';

@Injectable()
export class UnicoPerfilCadastradoValidator extends Validator<Perfil> {
  constructor(private readonly repository: PerfisRepository) {
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

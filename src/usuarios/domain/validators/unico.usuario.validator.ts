import { Erro } from '@/shared/domain/objetos/classes/erros/erro';
import { CampoJaCadastradoErro } from '@/shared/domain/objetos/classes/erros/shared/campo.ja.cadastrado.erro';
import { Validator } from '@/shared/domain/validators/validator';
import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { UsuariosRepository } from '../repositories/usuarios.repository';

@Injectable()
export class UnicoUsuarioValidator extends Validator<Usuario> {
  constructor(private readonly repository: UsuariosRepository) {
    super();
  }

  protected async _temErros({
    email,
  }: Partial<{ id: number; email: string; senha: string }>): Promise<Erro[]> {
    const usuarioCadastrado = await this.repository.findOne({
      email,
    });

    if (usuarioCadastrado) {
      return [new CampoJaCadastradoErro('email')];
    }
    return [];
  }
}

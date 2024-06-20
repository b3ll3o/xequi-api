import { ResultadoValidator } from '@/shared/domain/validators/resultado.validator';
import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsuariosRepository } from '../repositories/usuarios.repository';
import { UnicoUsuarioValidator } from '../validators/unico.usuario.validator';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly repository: UsuariosRepository,
    private readonly unicoUsuarioValidator: UnicoUsuarioValidator,
  ) {}

  async cadastra({
    email,
    senha,
  }: Partial<Usuario>): Promise<ResultadoValidator<Usuario>> {
    const { resultado, notificacaoErros } =
      await this.unicoUsuarioValidator.valida({ email, senha });
    if (notificacaoErros.invalido()) {
      return new ResultadoValidator(notificacaoErros, resultado);
    }
    const senhaHash = await this.senhaHash(senha);
    const usuario = await this.repository.save({ email, senha: senhaHash });
    return new ResultadoValidator(notificacaoErros, usuario);
  }

  private async senhaHash(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(senha, salt);
  }
}

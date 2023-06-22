import { Injectable } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async cadastra(novoUsuario: Usuario): Promise<Usuario> {
    const usuarioEncontrado = await this._buscaUsuarioPorEmail(
      novoUsuario.email,
    );
    if (!novoUsuario.podeSerCadastrado(usuarioEncontrado)) {
      return novoUsuario;
    }
    novoUsuario.senha = await this._hashSenha(novoUsuario.senha);
    const usuario = await this.usuariosRepository.save(novoUsuario);
    usuario.senha = undefined;
    return usuario;
  }

  private async _buscaUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  private async _hashSenha(senha: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(senha, salt);
  }
}

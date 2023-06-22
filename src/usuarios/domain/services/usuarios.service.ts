import { Injectable } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    const usuario = await this.usuariosRepository.save(novoUsuario);
    usuario.senha = undefined;
    return usuario;
  }

  private async _buscaUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }
}

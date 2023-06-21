import { Usuario } from '@/usuarios/domain/entities/usuario.entity';

export class UsuarioStub {
  static EMAIL = 'email@email.com';
  static SENHA = 'Senha@123';

  static novo(
    usuario: Usuario = new Usuario({
      id: null,
      email: this.EMAIL,
      senha: this.SENHA,
    }),
  ): Usuario {
    return usuario;
  }

  static cadastrado(
    usuario: Usuario = new Usuario({
      id: 1,
      email: this.EMAIL,
      senha: this.SENHA,
    }),
  ): Usuario {
    return usuario;
  }
}

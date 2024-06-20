import { Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class UsuarioStub {
  static ID = 1;
  static EMAIL = 'email@email.com';
  static PERFIL = 'perfil';
  static EMAIL_2 = 'teste@teste.com';
  static SENHA = 'Senha@123';
  static SENHA_2 = 'Outra@123';

  static novo(
    usuario: Usuario = {
      id: null,
      email: this.EMAIL,
      senha: this.SENHA,
    },
  ): Usuario {
    return usuario;
  }

  static cadastrado(
    usuario: Usuario = {
      id: 1,
      email: this.EMAIL,
      senha: this.SENHA,
    },
  ): Usuario {
    return usuario;
  }

  static async cadastradoHashSenha(): Promise<Usuario> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(UsuarioStub.SENHA, salt);
    return {
      id: 1,
      email: this.EMAIL,
      senha: hash,
    };
  }
}

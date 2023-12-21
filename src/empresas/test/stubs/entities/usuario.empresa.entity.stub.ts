import { UsuarioEmpresa } from '@/empresas/domain/entities/usuario.empresa.entity';
import { UsuarioStub } from '@/usuarios/test/stubs/entities/usuario.entity.stub';
import { EmpresaStub } from './empresa.entity.stub';
import { PerfilUsuarioEmpresaEnum } from '@/empresas/domain/enums/perfil.usuario.empresa.enum';

export class UsuarioEmpresaStub {
  static cadastrado(): UsuarioEmpresa {
    return new UsuarioEmpresa({
      usuario: UsuarioStub.cadastrado(),
      empresa: EmpresaStub.cadastrada(),
      perfil: PerfilUsuarioEmpresaEnum.ADMINISTRADOR,
    });
  }
}

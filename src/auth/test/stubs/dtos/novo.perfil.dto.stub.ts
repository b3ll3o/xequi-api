import { NovoPerfilDto } from '@/auth/application/dtos/novo.perfil.dto';
import { PerfilStub } from '../domain/entities/perfil.entity.stub';

export class NovoPerfilDtoStub {
  static novo(
    perfil: NovoPerfilDto = new NovoPerfilDto({
      nome: PerfilStub.NOME_PERFIL,
    }),
  ): NovoPerfilDto {
    return perfil;
  }
}

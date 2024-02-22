import { NovaAutorizaoDto } from '@/auth/application/dtos/nova.autorizao.dto';
import { AutorizaoStub } from '../domain/entities/autorizacao.entity.stub';

export class NovaAutorizaoDtoStub {
  static nova(
    novaAutorizaoDto: NovaAutorizaoDto = new NovaAutorizaoDto({
      nome: AutorizaoStub.NOME_AUTORIZAO,
    }),
  ): NovaAutorizaoDto {
    return novaAutorizaoDto;
  }
}

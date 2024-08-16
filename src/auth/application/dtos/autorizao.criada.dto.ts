import { Autorizacao } from '@/auth/domain/entities/autorizao.entity';
import { Objeto } from '@/shared/objetos/objeto';
import { ApiProperty } from '@nestjs/swagger';

export class AutorizaoCriadaDto extends Objeto<AutorizaoCriadaDto> {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nome: string;

  constructor(autorizao: Autorizacao) {
    const { id, nome } = autorizao;
    super({ id, nome });
  }
}

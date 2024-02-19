import { Autorizacao } from '@/auth/domain/entities/autorizao.entity';
import { Objeto } from '@/shared/objetos/objeto';

export class AutorizaoCriadaDto extends Objeto<AutorizaoCriadaDto> {
  id: number;
  nome: string;

  constructor(autorizao: Autorizacao) {
    const { id, nome } = autorizao;
    super({ id, nome });
  }
}

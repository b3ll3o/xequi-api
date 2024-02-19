import { Perfil } from '@/auth/domain/entities/perfil.entity';
import { Objeto } from '@/shared/objetos/objeto';

export class PerfilCadastradoDto extends Objeto<PerfilCadastradoDto> {
  id: number;
  nome: string;

  constructor(perfil: Perfil) {
    const { id, nome } = perfil;
    super({ id, nome });
  }
}

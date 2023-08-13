import { Objeto } from '@/shared/objetos/objeto';

export class EmpresaCadastradaDto extends Objeto<EmpresaCadastradaDto> {
  id: number;
  nome: string;
  constructor(empresaCadastradaDto: Partial<EmpresaCadastradaDto>) {
    const { id, nome } = empresaCadastradaDto;
    super({
      id,
      nome,
    });
  }
}

import { Objeto } from '@/shared/objetos/objeto';
import { ApiProperty } from '@nestjs/swagger';

export class EmpresaCadastradaDto extends Objeto<EmpresaCadastradaDto> {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nome: string;
  constructor(empresaCadastradaDto: Partial<EmpresaCadastradaDto>) {
    const { id, nome } = empresaCadastradaDto;
    super({
      id,
      nome,
    });
  }
}

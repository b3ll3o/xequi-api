import { BadRequestException } from '@nestjs/common';
import { ErroDto } from '../domain/objetos/classes/dtos /erro.dto';
import { Erro } from '../domain/objetos/classes/erros/erro';

export class BadRequestCustomException extends BadRequestException {
  constructor(erros: Erro[]) {
    super({ erros: [...erros.map((e) => new ErroDto(e))] });
  }
}

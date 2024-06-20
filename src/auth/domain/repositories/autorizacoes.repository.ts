import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Autorizacao } from '@prisma/client';

@Injectable()
export class AutorizacoesRepository {
  constructor(private readonly repository: PrismaService) {}

  async findOne({ nome }: Partial<Autorizacao>): Promise<Autorizacao> {
    return this.repository.autorizacao.findUnique({
      where: { nome },
    });
  }

  async save({ nome }: Partial<Autorizacao>): Promise<Autorizacao> {
    return this.repository.autorizacao.create({ data: { nome } });
  }
}

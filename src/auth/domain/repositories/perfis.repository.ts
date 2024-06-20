import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Perfil } from '@prisma/client';

@Injectable()
export class PerfisRepository {
  constructor(private readonly repository: PrismaService) {}

  async findOne({ nome }: Partial<Perfil>): Promise<Perfil> {
    return this.repository.perfil.findUnique({
      where: { nome },
    });
  }

  async save({ nome }: Partial<Perfil>): Promise<Perfil> {
    return this.repository.perfil.create({ data: { nome } });
  }
}

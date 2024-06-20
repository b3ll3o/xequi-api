import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuariosRepository {
  constructor(private readonly repository: PrismaService) {}

  async findOne({ email }: Partial<Usuario>): Promise<Usuario> {
    return this.repository.usuario.findUnique({
      where: { email },
    });
  }

  async save({ email, senha }: Partial<Usuario>): Promise<Usuario> {
    return this.repository.usuario.create({ data: { email, senha } });
  }
}

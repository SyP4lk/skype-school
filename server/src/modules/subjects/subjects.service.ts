import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Subject } from '@prisma/client';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Subject[]> {
    return this.prisma.subject.findMany();
  }

  async findOne(id: string): Promise<Subject | null> {
    return this.prisma.subject.findUnique({ where: { id } });
  }

  async create(data: { name: string; categoryId: string }): Promise<Subject> {
    return this.prisma.subject.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
      },
    });
  }

  async update(id: string, data: { name?: string; categoryId?: string }): Promise<Subject> {
    return this.prisma.subject.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Subject> {
    return this.prisma.subject.delete({ where: { id } });
  }
}

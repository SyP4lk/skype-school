import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany({ include: { subjects: true } });
  }

  async findOne(id: string):  Promise<Category | null> {
    return await this.prisma.category.findUnique({ where: { id }, include: { subjects: true } });
  }

  async create(data: { name: string }): Promise<Category> {
  return await this.prisma.category.create({
    data: {
      name: data.name, // <-- обязательно явно указать name
    },
  });
}


  async update(id: string, data: { name: string }): Promise<Category> {
    return await this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string): Promise<Category> {
    return await this.prisma.category.delete({ where: { id } });
  }
}

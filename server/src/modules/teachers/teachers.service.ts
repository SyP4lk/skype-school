import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter?: { categoryId?: string; subjectId?: string }) {
  let where: any = {};

  // Если есть фильтр
  if (filter?.categoryId || filter?.subjectId) {
    // Создаём массив условий для some
    const teacherSubjectWhere: any = {};
    if (filter.subjectId) {
      teacherSubjectWhere.subjectId = filter.subjectId;
    }
    if (filter.categoryId) {
      teacherSubjectWhere.subject = { categoryId: filter.categoryId };
    }
    where.teacherSubjects = { some: teacherSubjectWhere };
  }

  return this.prisma.teacher.findMany({
    where,
    include: {
      teacherSubjects: {
        include: { subject: true }
      }
    }
  });
}

  async findOne(id: string): Promise<any> {
    return this.prisma.teacher.findUnique({
      where: { id },
      include: {
        teacherSubjects: { include: { subject: true } }
      }
    });
  }

  async create(data: any) {
    return this.prisma.teacher.create({
      data,
    });
  }

  async update(id: string, data: any) {
  if (!data || Object.keys(data).length === 0) {
    throw new Error("Нет данных для обновления");
  }

  return this.prisma.teacher.update({
    where: { id },
    data,
  });
}


  async remove(id: string) {
    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}

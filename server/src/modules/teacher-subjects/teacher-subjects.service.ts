import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TeacherSubject } from '@prisma/client';

@Injectable()
export class TeacherSubjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<TeacherSubject[]> {
    return this.prisma.teacherSubject.findMany();
  }

  async findByTeacher(teacherId: string): Promise<TeacherSubject[]> {
    return this.prisma.teacherSubject.findMany({ where: { teacherId } });
  }

  async findOne(id: string): Promise<TeacherSubject | null> {
    return this.prisma.teacherSubject.findUnique({ where: { id } });
  }

  async create(data: { teacherId: string; subjectId: string; price: number; duration: number }): Promise<TeacherSubject> {
    return this.prisma.teacherSubject.create({
      data: {
        teacherId: data.teacherId,
        subjectId: data.subjectId,
        price: data.price,
        duration: data.duration,
      },
    });
  }

  async update(id: string, data: { price?: number; duration?: number }): Promise<TeacherSubject> {
    return this.prisma.teacherSubject.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<TeacherSubject> {
    return this.prisma.teacherSubject.delete({ where: { id } });
  }
}

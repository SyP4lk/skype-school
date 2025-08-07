import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TeacherSubjectsService } from './teacher-subjects.service';

@Controller('teacher-subjects')
export class TeacherSubjectsController {
  constructor(private readonly teacherSubjectsService: TeacherSubjectsService) {}

  @Get()
  findAll(@Query('teacherId') teacherId?: string) {
    if (teacherId) return this.teacherSubjectsService.findByTeacher(teacherId);
    return this.teacherSubjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherSubjectsService.findOne(id);
  }

  @Post()
  create(@Body() data: { teacherId: string; subjectId: string; price: number; duration: number }) {
    console.log("CREATE TeacherSubject", data);
    return this.teacherSubjectsService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: { price?: number; duration?: number }) {
    return this.teacherSubjectsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherSubjectsService.remove(id);
  }
}

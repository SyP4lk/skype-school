import { Module } from '@nestjs/common';
import { TeacherSubjectsController } from './teacher-subjects.controller';
import { TeacherSubjectsService } from './teacher-subjects.service';

@Module({
  controllers: [TeacherSubjectsController],
  providers: [TeacherSubjectsService],
})
export class TeacherSubjectsModule {}

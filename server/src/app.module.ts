import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { SubjectsController } from './modules/subjects/subjects.controller';
import { SubjectsService } from './modules/subjects/subjects.service';
import { TeachersModule } from './modules/teachers/teachers.module';
import { TeacherSubjectsModule } from './modules/teacher-subjects/teacher-subjects.module';
import { PrismaModule } from './prisma/prisma.module';
import { SubjectsModule } from './modules/subjects/subjects.module';

@Module({
  imports: [CategoriesModule, TeachersModule, TeacherSubjectsModule, PrismaModule, TeachersModule, TeacherSubjectsModule, SubjectsModule ],
  controllers: [AppController, SubjectsController],
  providers: [AppService, SubjectsService],
})
export class AppModule {}

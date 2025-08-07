import { Test, TestingModule } from '@nestjs/testing';
import { TeacherSubjectsController } from './teacher-subjects.controller';

describe('TeacherSubjectsController', () => {
  let controller: TeacherSubjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherSubjectsController],
    }).compile();

    controller = module.get<TeacherSubjectsController>(TeacherSubjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

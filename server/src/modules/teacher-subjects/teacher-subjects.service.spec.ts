import { Test, TestingModule } from '@nestjs/testing';
import { TeacherSubjectsService } from './teacher-subjects.service';

describe('TeacherSubjectsService', () => {
  let service: TeacherSubjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherSubjectsService],
    }).compile();

    service = module.get<TeacherSubjectsService>(TeacherSubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('subjectId') subjectId?: string,
  ) {
    return this.teachersService.findAll({ categoryId, subjectId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.teachersService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.teachersService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}

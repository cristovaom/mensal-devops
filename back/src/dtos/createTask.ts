import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'The name of the task' })
  name: string;
  @ApiProperty({ description: 'The description of the task' })
  description: string;
}

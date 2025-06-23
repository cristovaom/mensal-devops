import { ApiProperty } from '@nestjs/swagger';

export class EditTaskDto {
  @ApiProperty({ description: 'The id of the task' })
  id: number;
  @ApiProperty({ description: 'The name of the task' })
  name: string;
  @ApiProperty({ description: 'The description of the task' })
  description: string;
}

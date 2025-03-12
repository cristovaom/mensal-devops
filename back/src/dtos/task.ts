import { ApiProperty } from '@nestjs/swagger';

export class TaskDTO {
  @ApiProperty({ description: 'The id of the task' })
  id?: number;
  @ApiProperty({ description: 'The name of the task' })
  name: string;
  @ApiProperty({ description: 'The description of the task' })
  description: string;
  @ApiProperty({ description: 'The creation date of the task' })
  createdAt?: Date;
  @ApiProperty({ description: 'The update date of the task' })
  updatedAt?: Date;
  //atualizar

}

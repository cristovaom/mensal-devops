import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskDTO } from '../dtos/task';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from 'src/dtos/createTask';
import { EditTaskDto } from 'src/dtos/editTaskDto';

@Controller('/api/tasks')
@ApiTags('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'List of all tasks', type: [TaskDTO] })
  @ApiResponse({ status: 404, description: 'No tasks found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task found', type: TaskDTO })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto, description: 'Task data' })
  @ApiResponse({ status: 201, description: 'Task created successfully', type: TaskDTO })
  @ApiResponse({ status: 400, description: 'Invalid task data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() data: TaskDTO): Promise<TaskDTO> {
    try {
      const task = await this.taskService.create(data);
      return task;
    } catch (error) {
      throw new Error('Failed to create task: ' + error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', type: 'number', description: 'Task ID' })
  @ApiBody({ type: EditTaskDto, description: 'Updated task data' })
  @ApiResponse({ status: 200, description: 'Task updated successfully', type: TaskDTO })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Invalid task data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TaskDTO,
  ) {
    return await this.taskService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', type: 'number', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.remove(id);
  }
}

import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { db } from '../../db/prisma';
import { TaskDTO } from '../dtos/task';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor() {}

  async findAll() {
    try {
      const tasks = await db.task.findMany();
      if (!tasks.length) {
        throw new NotFoundException('No tasks found');
      }
      return tasks;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error retrieving tasks');
    }
  }

  async findOne(id: number) {
    try {
      const task = await db.task.findUnique({
        where: { id },
      });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error retrieving task ${id}`);
    }
  }

  async create(data: TaskDTO) {
    try {
      return await db.task.create({
        data: {
          name: data.name,
          description: data.description,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException('Error creating task: Invalid data provided');
      }
      throw new InternalServerErrorException('Error creating task');
    }
  }

  async update(id: number, data: TaskDTO) {
    try {
      const task = await this.findOne(id); // This will throw NotFoundException if task doesn't exist
      return await db.task.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new InternalServerErrorException('Error updating task: Invalid data provided');
      }
      throw new InternalServerErrorException(`Error updating task ${id}`);
    }
  }

  async remove(id: number) {
    try {
      const task = await this.findOne(id); // This will throw NotFoundException if task doesn't exist
      return await db.task.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error deleting task ${id}`);
    }
  }
}

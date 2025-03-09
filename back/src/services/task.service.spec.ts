import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { db } from '../../db/prisma';

// Test pipeline 2

jest.mock('../../db/prisma', () => ({
  db: {
    task: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        { id: 1, name: 'Task 1', description: 'Description 1' },
        { id: 2, name: 'Task 2', description: 'Description 2' }
      ];

      (db.task.findMany as jest.Mock).mockResolvedValue(mockTasks);

      const result = await service.findAll();

      expect(result).toEqual(mockTasks);
      expect(db.task.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      const mockTask = { id: 1, name: 'Task 1', description: 'Description 1' };

      (db.task.findUnique as jest.Mock).mockResolvedValue(mockTask);

      const result = await service.findOne(1);

      expect(result).toEqual(mockTask);
      expect(db.task.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });
  });

  describe('create', () => {
    it('should create a task', async () => {
      const taskDto = { name: 'New Task', description: 'New Description' };
      const mockTask = { id: 1, ...taskDto };

      (db.task.create as jest.Mock).mockResolvedValue(mockTask);

      const result = await service.create(taskDto);

      expect(result).toEqual(mockTask);
      expect(db.task.create).toHaveBeenCalledWith({
        data: taskDto
      });
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const taskDto = { name: 'Updated Task', description: 'Updated Description' };
      const mockTask = { id: 1, ...taskDto };

      (db.task.update as jest.Mock).mockResolvedValue(mockTask);

      const result = await service.update(1, taskDto);

      expect(result).toEqual(mockTask);
      expect(db.task.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: taskDto
      });
    });
  });

  describe('remove', () => {
    it('should delete a task', async () => {
      const mockTask = { id: 1, name: 'Task 1', description: 'Description 1' };

      (db.task.delete as jest.Mock).mockResolvedValue(mockTask);

      const result = await service.remove(1);

      expect(result).toEqual(mockTask);
      expect(db.task.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });
  });
});

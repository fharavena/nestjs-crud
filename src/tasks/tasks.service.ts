import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];
  private tasks: Task[] = [
    {
      id: 'd2eba71d-4b6e-4af0-af08-5c668e3f4a65',
      title: 'title-1',
      description: 'description-44',
      status: TaskStatus.OPEN,
    },
    {
      id: 'd2eba71d-4b6e-4af0-af08-5c668e3f4a66',
      title: 'title-2',
      description: 'description-55',
      status: TaskStatus.OPEN,
    },
    {
      id: 'd2eba71d-4b6e-4af0-af08-5c668e3f4a67',
      title: 'title-3',
      description: 'description-66',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    console.log(this.tasks);

    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }
}

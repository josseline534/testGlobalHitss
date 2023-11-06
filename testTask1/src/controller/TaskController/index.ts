/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AppDataSource } from '../../data-source'
import { Task } from '../../entity/Task'
import { type ITaskUpdate, type ITaskCreate } from './interface'

export class TaskController {
  private readonly taskRepository = AppDataSource.getRepository(Task)

  async all (): Promise<Task[]> {
    try {
      return await this.taskRepository.find()
    } catch (error) {
      throw error
    }
  }

  async one (id: number): Promise<Task | null> {
    try {
      const task = await this.taskRepository.findOne({
        where: { id }
      })
      return task
    } catch (error) {
      throw error
    }
  }

  async save (taskBody: ITaskCreate): Promise<Task> {
    try {
      const task = Object.assign(new Task(), taskBody)
      await this.taskRepository.save(task)
      return task
    } catch (error) {
      throw error
    }
  }

  async update (id: number, taskBody: ITaskUpdate): Promise<Task | null> {
    try {
      const existingTask = await this.one(id)

      if (!existingTask) return null
      if (taskBody.name) existingTask.name = taskBody.name
      if (taskBody.dateInit) existingTask.dateInit = taskBody.dateInit
      if (taskBody.dateEnd) existingTask.dateEnd = taskBody.dateEnd

      await this.taskRepository.save(existingTask)

      return existingTask
    } catch (error) {
      throw error
    }
  }

  async remove (id: number): Promise<Task | null> {
    try {
      const taskToRemove = await this.one(id)

      if (!taskToRemove) throw { message: 'Task not found' }
      if (!taskToRemove.dateEnd) throw { message: 'No se puede eliminar si no tiene asignada una fecha de finalización' }

      await this.taskRepository.remove(taskToRemove)

      return taskToRemove
    } catch (error) {
      throw error
    }
  }
}

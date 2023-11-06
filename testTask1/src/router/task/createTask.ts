import { type NextFunction, type Request, type Response } from 'express'
import { TaskController } from '../../controller/TaskController'
export const CreateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } = req
  try {
    const taskServices = new TaskController()
    const task = await taskServices.save({
      ...body,
      dateInit: new Date()
    })
    res.status(200).send(task)
  } catch (error) {
    next(error)
  }
}

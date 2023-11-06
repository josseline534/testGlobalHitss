import { type NextFunction, type Request, type Response } from 'express'
import { TaskController } from '../../controller/TaskController'
export const GetAllTasks = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const taskServices = new TaskController()
    const tasks = await taskServices.all()

    res.status(200).send(tasks)
  } catch (error) {
    next(error)
  }
}

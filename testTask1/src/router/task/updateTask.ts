import { type NextFunction, type Request, type Response } from 'express'
import { TaskController } from '../../controller/TaskController'
export const UpdateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body, params: { id } } = req
  try {
    const taskServices = new TaskController()
    const task = await taskServices.update(id, body)
    res.status(200).send(task)
  } catch (error) {
    next(error)
  }
}

import { type NextFunction, type Request, type Response } from 'express'
import { TaskController } from '../../controller/TaskController'
export const GetTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const taskServices = new TaskController()
    const task = await taskServices.one(req.params.id)

    res.status(200).send(task)
  } catch (error) {
    next(error)
  }
}

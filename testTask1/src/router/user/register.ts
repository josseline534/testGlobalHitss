import { type NextFunction, type Request, type Response } from 'express'
import { UserController } from '../../controller/UserController'
export const RegisterUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body } = req
  try {
    const userServices = new UserController()
    const user = await userServices.save(body)
    res.status(200).send({ firstName: user.firstName, lastName: user.lastName, email: user.email, age: user.age })
  } catch (error) {
    next(error)
  }
}

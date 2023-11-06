import { type NextFunction, type Request, type Response } from 'express'
import { AuthorizerController } from '../../controller/AuthorizerController'
export const LoginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { headers } = req
  try {
    const authorization = headers.authorization
    if (authorization === null || authorization === undefined) throw new Error('unauthorized')
    const token = await AuthorizerController.valid(authorization)
    res.status(200).send({ status: 'ok', token })
  } catch (error) {
    next(error)
  }
}

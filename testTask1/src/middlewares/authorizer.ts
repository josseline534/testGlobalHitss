import { type NextFunction, type Request, type Response } from 'express'
import { AuthorizerController } from '../controller/AuthorizerController'

export const AuthorizerToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers
  try {
    const token = authorization
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!token) {
      next({
        message: 'Acceso no autorizado. Token no proporcionado.',
        status: 401
      })
    }
    req.user = await AuthorizerController.verifyToken(token)
    next()
  } catch (error) {
    next(error)
  }
}

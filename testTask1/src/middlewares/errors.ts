import { type Request, type ErrorRequestHandler, type Response } from 'express'

const ERROR_TAG = '[ERROR-HANDLER]'

// eslint-disable-next-line max-params
export const ErrorHandler: ErrorRequestHandler = (error: Error, { method, originalUrl }, res: Response, _) => {
  if ('status' in error) {
    console.error(ERROR_TAG, { method, originalUrl, status: error.status, message: error.message })
    res.status(error.status).json(error)
  } else {
    console.error(ERROR_TAG, { method, originalUrl }, error.message)
    res.status(500).json(error)
  }
}

export const NotFoundErrorHandler = (_req: Request, res: Response): void => {
  res.status(400).json({ message: 'not found' })
}

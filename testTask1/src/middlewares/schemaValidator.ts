import { type NextFunction, type Request, type Response } from 'express'
import * as Joi from 'joi'

type checkType = keyof Pick<Request, 'body' | 'query' | 'params'>

export const SchemaValidator =
  (schema: unknown, check: checkType = 'body') =>
    (req: Request, _res: Response, next: NextFunction): void => {
      try {
        if (Joi.isSchema(schema)) {
          const { error, value }: Joi.ValidationResult = schema.validate(
            req[check],
            { abortEarly: false }
          )
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (error) {
            throw new Error(getJoiError(error))
          } else {
            req[check] = value
            next()
          }
        } else throw new Error('invalid schema')
      } catch (error) {
        next(error)
      }
    }

const getJoiError = ({ details }: Joi.ValidationError): string => {
  const { message }: { message: string } = details[0]
  return message.replace(/\s/g, '_').replace(/"/g, '')
}

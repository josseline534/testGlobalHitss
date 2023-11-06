/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { SchemaValidator } from '../../middlewares'
import { RegisterUser } from './register'
import { RegisterUserSchema } from './schema'
const PATH = '/user'

export function UserRoutes (router: Router): void {
  router
    .route(`${PATH}/register`)
    .post([SchemaValidator(RegisterUserSchema)], RegisterUser)
}

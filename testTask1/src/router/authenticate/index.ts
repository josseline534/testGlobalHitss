/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { LoginUser } from './login'
const PATH = '/authenticate'

export function LoginRoutes (router: Router): void {
  router
    .route(`${PATH}/login`)
    .post(LoginUser)
}

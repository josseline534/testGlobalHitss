import { Router as ExpressRouter } from 'express'
import { TaskRoutes } from './task'
import { UserRoutes } from './user'
import { LoginRoutes } from './authenticate'

const router = ExpressRouter()

TaskRoutes(router)
UserRoutes(router)
LoginRoutes(router)
export const Router = router

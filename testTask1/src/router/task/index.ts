/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router } from 'express'
import { AuthorizerToken, SchemaValidator } from '../../middlewares'
import { CreateTaskSchema, ParamIdSchema, UpdateTaskSchema } from './schema'
import { GetAllTasks } from './getAllTask'
import { CreateTask } from './createTask'
import { GetTask } from './getTask'
import { UpdateTask } from './updateTask'
import { DeleteTask } from './deleteTask'

const PATH = '/task'

export function TaskRoutes (router: Router): void {
  router.route(`${PATH}/all`).get(GetAllTasks)

  router
    .route(`${PATH}/:id`)
    .get([SchemaValidator(ParamIdSchema, 'params')], GetTask)
    .put(
      [
        AuthorizerToken,
        SchemaValidator(ParamIdSchema, 'params'),
        SchemaValidator(UpdateTaskSchema)
      ],
      UpdateTask
    )
    .delete([AuthorizerToken, SchemaValidator(ParamIdSchema, 'params')], DeleteTask)

  router
    .route(`${PATH}/new`)
    .post([AuthorizerToken, SchemaValidator(CreateTaskSchema)], CreateTask)
}

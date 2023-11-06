import * as Joi from 'joi'
import { type ITaskCreate } from '../../../controller/TaskController/interface'

export const CreateTaskSchema = Joi.object<ITaskCreate>().keys({
  name: Joi.string().required(),
  dateEnd: Joi.date().greater('now')
})

export const UpdateTaskSchema = Joi.object<ITaskCreate>().keys({
  name: Joi.string(),
  dateInit: Joi.date(),
  dateEnd: Joi.date()
})

export const ParamIdSchema = Joi.object().keys({
  id: Joi.number().required()
})

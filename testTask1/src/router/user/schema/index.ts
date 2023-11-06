import * as Joi from 'joi'
import { type IUser } from '../../../controller/UserController/interface'

// ^: Coincide con el inicio de la cadena.
// (?=.*[A-Z]): Debe contener al menos una letra mayúscula.
// (?=.*[a-z]): Debe contener al menos una letra minúscula.
// (?=.*\d): Debe contener al menos un número.
// (?=.*[@$!%*?&]): Debe contener al menos uno de los caracteres especiales indicados.
// [A-Za-z\d@$!%*?&]{8,}: Acepta letras mayúsculas, minúsculas, números y caracteres especiales, con una longitud mínima de 8 caracteres.
// $: Coincide con el final de la cadena.
export const RegisterUserSchema = Joi.object<IUser>().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().min(18).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required()
})

/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable no-useless-catch */
import * as base64 from 'base-64'
import * as jwt from 'jsonwebtoken'
import { configEnv } from '../../config'
import { comparePassword } from '../../utils'
import { UserController } from '../UserController'
import { type User } from '../../entity/User'
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthorizerController {
  static async valid (authHeader: string): Promise<string> {
    try {
      if (!authHeader.startsWith('Basic ')) throw new Error('unauthorized')
      const base64Credentials = authHeader.slice('Basic '.length)
      const credentials = base64.decode(base64Credentials)

      const [username, password] = credentials.split(':')
      const userServices = new UserController()
      const user = await userServices.one(username)
      if (!comparePassword(password, user.password)) throw { message: 'unauthorized', status: 401 }
      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age
        },
        configEnv.secretKey,
        { expiresIn: '12h' }
      )
      return token
    } catch (error) {
      throw error
    }
  }

  static async verifyToken (token: string): Promise<User> {
    try {
      const decoded = await jwt.verify(token, configEnv.secretKey)

      return decoded
    } catch (error) {
      throw error
    }
  }
}

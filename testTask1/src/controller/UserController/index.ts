/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { AppDataSource } from '../../data-source'
import { type Request } from 'express'
import { User } from '../../entity/User'
import { type IUser } from './interface'
import { encryptedPassword } from '../../utils'

export class UserController {
  private readonly userRepository = AppDataSource.getRepository(User)

  async all (): Promise<User[]> {
    return await this.userRepository.find()
  }

  async one (email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw { message: 'unregistered user', status: 404 }
    }
    return user
  }

  async save (userBody: IUser): Promise<User> {
    try {
      userBody.password = encryptedPassword(userBody.password)
      const user = Object.assign(new User(), userBody)
      await this.userRepository.save(user)
      return user
    } catch (error) {
      throw error
    }
  }

  async remove (request: Request): Promise<string> {
    const id = parseInt(request.params.id)

    const userToRemove = await this.userRepository.findOneBy({ id })

    if (!userToRemove) {
      return 'this user not exist'
    }

    await this.userRepository.remove(userToRemove)

    return 'user has been removed'
  }
}

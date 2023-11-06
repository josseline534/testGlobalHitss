import { type User } from '../../entity/User'

export interface IUser extends Omit<User, 'id'> {}

import { type UserDoc, UserModel } from '@lib/models/user/user.model'
import { UserService } from '@lib/services/user/user.service'

export const userService = new UserService<UserDoc>(UserModel)

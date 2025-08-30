import { userService } from '@lib/services/user'
import connectToDatabase from '@lib/utils/db'

export async function startup() {
  if (await userService.getUserByUsername('admin')) {
    return
  }

  await connectToDatabase()
  await userService.ensureDefaultAdmin()
}

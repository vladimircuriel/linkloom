import User from '@components/user/User'
import { userService } from '@lib/services/user'

const UserTable = async ({ userId }: { userId: string }) => {
  const user = await userService.getUserById(userId)
  if (!user) {
    return <span className="text-gray-400">Unknown User</span>
  }
  return <User user={user} />
}

export default UserTable

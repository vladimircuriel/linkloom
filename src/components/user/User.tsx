import type { UserDoc } from '@lib/models/user/user.model'
import Image from 'next/image'

type UserProperties = {
  user: UserDoc
}

export default function User({ user }: UserProperties) {
  return (
    <div className="flex items-center justify-start gap-x-5">
      <Image
        src={`https://unavatar.io/${user?.username}`}
        alt={user.name}
        width={50}
        height={50}
        className="rounded-full"
      />

      <div className="flex flex-col items-start justify-center">
        <span className="">{user.name}</span>
        {user.isAdmin && <span className="text-xs text-main-dark-white">Administrator</span>}
        {!user.isAdmin && <span className="text-xs text-main-dark-white">User</span>}
      </div>
    </div>
  )
}

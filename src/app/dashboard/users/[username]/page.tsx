import EditUserForm from '@components/forms/EditUserForm'
import { userService } from '@lib/services/user'
import Image from 'next/image'

export default async function DashboardUserPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await userService.getUserByUsername(username)

  if (!user) {
    return (
      <section className="flex items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center min-w-[450px] min-h-[450px] p-1 shadow-xl sm:p-14 md:p-20 w-fit gap-y-8 rounded-3xl bg-background-gray-translucent">
          <h3 className="text-4xl font-extrabold">User not found</h3>
        </div>
      </section>
    )
  }

  const plainUser = JSON.parse(JSON.stringify(user))

  return (
    <section className="flex flex-row items-center w-full p-2 shadow-xl sm:p-14 md:p-20 rounded-3xl bg-background-gray">
      <div className="flex flex-col items-center justify-center flex-2 gap-y-6">
        <h3 className="text-4xl font-extrabold">{user.name}</h3>
        <Image
          src={`https://unavatar.io/${user.username}`}
          width={250}
          height={250}
          alt="User Pic"
          className="rounded-full"
        />
      </div>

      <EditUserForm user={plainUser} />
    </section>
  )
}

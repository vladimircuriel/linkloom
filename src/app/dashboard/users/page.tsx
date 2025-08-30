import Button from '@components/buttons/Button'
import DeleteUserForm from '@components/forms/DeleteUserForm'
import Heading from '@components/headings/Heading'
import SearchInput from '@components/inputs/SearchInput'
import Pagination from '@components/pagination/Pagination'
import User from '@components/user/User'
import Routes from '@lib/constants/routes.constants'
import { userService } from '@lib/services/user'
import formattedDate from '@lib/utils/date'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import auth from '@/src/lib/auth/auth'

export default async function DashboardUsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const resolvedSearchParams = await searchParams
  const q = resolvedSearchParams.q
  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1

  const { usersAmount, users } = await userService.getUsers({
    q: typeof q === 'string' ? q : '',
    page: page || 1,
    perPage: 7,
  })

  const userPayload = await auth.getAuthPayload()
  if (!userPayload?.isAdmin) redirect(Routes.HOME)

  return (
    <section className="flex mt-5 mb-5 gap-x-5 ">
      <div className="flex flex-col w-full p-5 rounded-lg gap-y-5 bg-main-gray">
        <nav>
          <ul className="flex items-center justify-between gap-x-4>">
            <li>
              <SearchInput placeholder="Search for an user..." />
            </li>
            <li>
              <Button className="bg-main-blue border-main-blue">
                <Link href={`${Routes.DASHBOARD}/users/add`}>Add user</Link>
              </Button>
            </li>
          </ul>
        </nav>

        <Heading>Latest Users</Heading>
        <table className="w-full">
          <thead>
            <tr>
              <td className="p-3 font-bold text-start">User</td>
              <td className="p-3 font-bold text-start">Email</td>
              <td className="p-3 font-bold">Created at</td>
              <td className="p-3 font-bold">Rol</td>
              <td className="p-3 font-bold">Action</td>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id.toString()}>
                <td className="p-3">
                  <User user={user} />
                </td>
                <td className="p-3 text-start max-w-44">
                  <span>{user.email}</span>
                </td>

                <td className="p-3">{formattedDate(user.createdAt)}</td>
                <td className="p-3">
                  <span
                    className={`p-[5px] rounded-md ${
                      user.isAdmin ? 'bg-main-blue/50' : 'bg-green-800/50'
                    }`}
                  >
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-center gap-x-5">
                    <Link href={`${Routes.DASHBOARD}/users/${user.username}`}>
                      <Button className="bg-main-blue border-main-blue !p-1 !rounded-md">
                        View
                      </Button>
                    </Link>
                    {user._id.toString() !== userPayload.sub && !user.isAdmin && (
                      <DeleteUserForm userId={user._id.toString()} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination count={usersAmount} />
      </div>
    </section>
  )
}

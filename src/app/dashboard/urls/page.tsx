import ChangeUrlStatusForm from '@components/forms/ChangeUrlStatusForm'
import Heading from '@components/headings/Heading'
import SearchInput from '@components/inputs/SearchInput'
import Pagination from '@components/pagination/Pagination'
import Routes from '@lib/constants/routes.constants'
import { urlService } from '@lib/services/url'
import UserTable from '@lib/utils/user'
import Link from 'next/link'

export default async function DashboardUrls({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const q = resolvedSearchParams.q
  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1

  const { urlsAmount, urls } = await urlService.getUrls({
    q: typeof q === 'string' ? q : '',
    page: page || 1,
    perPage: 7,
  })

  return (
    <section className="flex flex-col w-full p-5 rounded-lg gap-y-5 bg-main-gray">
      <nav>
        <ul className="flex items-center justify-between gap-x-4>">
          <li>
            <SearchInput placeholder="Search for an url..." />
          </li>
        </ul>
      </nav>

      <Heading>Latest Urls</Heading>
      <table className="w-full">
        <thead>
          <tr>
            <td className="p-3 font-bold text-start">Short Link</td>
            <td className="p-3 font-bold text-start">Original Link</td>
            <td className="p-3 font-bold">Clicks</td>
            <td className="p-3 font-bold">Status</td>
            <td className="p-3 font-bold">User</td>
            <td className="p-3 font-bold">Action</td>
          </tr>
        </thead>
        <tbody>
          {urls?.map((url) => (
            <tr key={url._id.toString()}>
              <td className="p-3 text-start max-w-10">
                <Link href={`/url/${url.shortUrl}`} rel="noopener" target="_blank">
                  <span className="transition hover:underline hover:text-main-blue-active">
                    {url.shortUrl}
                  </span>
                </Link>
              </td>
              <td className="p-3 text-start max-w-24">
                <Link href={url.originalUrl}>
                  <span className="transition line-clamp-1 hover:underline hover:text-main-blue-active">
                    {url.originalUrl}
                  </span>
                </Link>
              </td>
              <td className="p-3">{url.clicks}</td>
              <td className="p-3">
                <span
                  className={`p-[5px] rounded-md ${url.status ? 'bg-green-800/50' : 'bg-red-800/50'}`}
                >
                  {url.status ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="flex items-center justify-center p-3">
                <Link href={`${Routes.DASHBOARD}/users/${url.user}`}>
                  <UserTable userId={url.user.toString()} />
                </Link>
              </td>
              <td>
                <ChangeUrlStatusForm urlId={url._id.toString()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={urlsAmount} />
    </section>
  )
}
